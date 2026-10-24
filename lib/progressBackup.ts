/** Moving progress between devices without accounts.
 *
 *  Everything the tools remember lives in local storage under keys that
 *  start with "gtp". A backup is those keys and their raw values. It travels
 *  as a file, a pasted code, or a link whose payload sits in the URL
 *  fragment (#…) — which browsers never send to the server, so even the
 *  link route uploads nothing.
 *
 *  Importing merges, per kind of data, so it can never lose progress and
 *  importing the same backup twice changes nothing. */

export const BACKUP_APP = 'guitartunepro';
export const BACKUP_VERSION = 1;
const MAX_BACKUP_BYTES = 1_000_000;

/** Device-specific: the measured delay of this device's speakers. Never
 *  copied to another device, where it would be wrong. */
const RHYTHM_KEY = 'gtp-rhythm-trainer';

export interface Backup {
  app: typeof BACKUP_APP;
  version: number;
  exportedAt: string;
  /** Storage key → raw stored string. */
  data: Record<string, string>;
}

const isSiteKey = (key: string) => key.startsWith('gtp');

export function collectBackup(): Backup {
  const data: Record<string, string> = {};
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !isSiteKey(key)) continue;
      const value = window.localStorage.getItem(key);
      if (value !== null) data[key] = value;
    }
  } catch {
    // Storage blocked: an empty backup, which the page reports.
  }
  if (data[RHYTHM_KEY]) {
    const rhythm = parse<Record<string, unknown>>(data[RHYTHM_KEY]);
    if (rhythm) {
      delete rhythm.latencyMs;
      data[RHYTHM_KEY] = JSON.stringify(rhythm);
    }
  }
  return { app: BACKUP_APP, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
}

function parse<T>(raw: string | null | undefined): T | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    return value && typeof value === 'object' ? (value as T) : null;
  } catch {
    return null;
  }
}

/** Throws with a readable message when `value` is not one of our backups. */
export function validateBackup(value: unknown): Backup {
  const b = value as Partial<Backup> | null;
  if (!b || typeof b !== 'object' || b.app !== BACKUP_APP) throw new Error('This is not a GuitarTunePro progress backup.');
  if (typeof b.version !== 'number' || b.version > BACKUP_VERSION) {
    throw new Error('This backup was made by a newer version of the site. Reload the page and try again.');
  }
  if (!b.data || typeof b.data !== 'object') throw new Error('The backup is empty or damaged.');
  const data: Record<string, string> = {};
  for (const [key, val] of Object.entries(b.data)) {
    if (isSiteKey(key) && typeof val === 'string') data[key] = val;
  }
  return { app: BACKUP_APP, version: b.version, exportedAt: String(b.exportedAt ?? ''), data };
}

// ── Merging ────────────────────────────────────────────────────────────────

type Tally = Record<string, [number, number]>;

/** Per-answer accuracy: keep whichever side has seen more questions, rather
 *  than adding — adding would double-count a backup imported twice. */
const mergeTally = (a: Tally = {}, b: Tally = {}): Tally => {
  const out: Tally = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (!out[k] || (Array.isArray(v) && v[1] > out[k][1])) out[k] = v;
  }
  return out;
};

type Merger = (local: string, incoming: string) => string;

const json = (v: unknown) => JSON.stringify(v);

const MERGERS: Record<string, Merger> = {
  'gtp-practice-log': (l, i) => {
    type Day = { minutes: number; activities: string[]; routines: number };
    const a = parse<Record<string, Day>>(l) ?? {};
    const b = parse<Record<string, Day>>(i) ?? {};
    const out: Record<string, Day> = { ...a };
    for (const [date, day] of Object.entries(b)) {
      const mine = out[date];
      out[date] = mine
        ? {
            minutes: Math.max(mine.minutes || 0, day.minutes || 0),
            activities: [...new Set([...(mine.activities ?? []), ...(day.activities ?? [])])],
            routines: Math.max(mine.routines || 0, day.routines || 0),
          }
        : day;
    }
    return json(out);
  },
  'gtp-daily-challenge': (l, i) => {
    const a = parse<Record<string, boolean[]>>(l) ?? {};
    const b = parse<Record<string, boolean[]>>(i) ?? {};
    const out = { ...a };
    for (const [n, answers] of Object.entries(b)) {
      if (!out[n] || (Array.isArray(answers) && answers.length > out[n].length)) out[n] = answers;
    }
    return json(out);
  },
  'gtp-beginner-course': (l, i) => {
    const a = parse<Record<string, string>>(l) ?? {};
    const b = parse<Record<string, string>>(i) ?? {};
    const out = { ...a };
    // Keep the earlier completion date when both devices finished a day.
    for (const [day, date] of Object.entries(b)) if (!out[day] || date < out[day]) out[day] = date;
    return json(out);
  },
  [RHYTHM_KEY]: (l, i) => {
    type Saved = { latencyMs?: number; best?: Record<string, { score: number; bpm: number }> };
    const a = parse<Saved>(l) ?? {};
    const b = parse<Saved>(i) ?? {};
    const best = { ...(a.best ?? {}) };
    for (const [id, entry] of Object.entries(b.best ?? {})) if (!best[id] || entry.score > best[id].score) best[id] = entry;
    // This device's own calibration, never the other device's.
    return json({ ...(a.latencyMs !== undefined ? { latencyMs: a.latencyMs } : {}), best });
  },
  'gtp-ear-training': (l, i) => {
    const a = parse<{ bestStreak?: number; byAnswer?: Tally }>(l) ?? {};
    const b = parse<{ bestStreak?: number; byAnswer?: Tally }>(i) ?? {};
    return json({ bestStreak: Math.max(a.bestStreak ?? 0, b.bestStreak ?? 0), byAnswer: mergeTally(a.byAnswer, b.byAnswer) });
  },
  'gtp-fretboard-trainer': (l, i) => {
    const a = parse<{ bestStreak?: number; byString?: Tally }>(l) ?? {};
    const b = parse<{ bestStreak?: number; byString?: Tally }>(i) ?? {};
    return json({ bestStreak: Math.max(a.bestStreak ?? 0, b.bestStreak ?? 0), byString: mergeTally(a.byString, b.byString) });
  },
};

/** What an import would bring in, for the confirmation screen. */
export function summarise(data: Record<string, string>) {
  const log = parse<Record<string, unknown>>(data['gtp-practice-log']) ?? {};
  const daily = parse<Record<string, boolean[]>>(data['gtp-daily-challenge']) ?? {};
  const course = parse<Record<string, string>>(data['gtp-beginner-course']) ?? {};
  const rhythm = parse<{ best?: Record<string, unknown> }>(data[RHYTHM_KEY]);
  return {
    practiceDays: Object.keys(log).length,
    challenges: Object.values(daily).filter((a) => Array.isArray(a) && a.length >= 5).length,
    courseDays: Object.keys(course).length,
    rhythmBests: Object.keys(rhythm?.best ?? {}).length,
    keys: Object.keys(data).length,
  };
}

/** Merge a backup into this device's storage. Returns how many keys changed. */
export function importBackup(backup: Backup): number {
  let changed = 0;
  for (const [key, incoming] of Object.entries(backup.data)) {
    try {
      const local = window.localStorage.getItem(key);
      const merger = MERGERS[key];
      // Settings and drafts without a merge rule: this device wins.
      const next = local === null ? (merger ? merger('{}', incoming) : incoming) : merger ? merger(local, incoming) : local;
      if (next !== local) {
        window.localStorage.setItem(key, next);
        changed++;
      }
    } catch {
      // One bad or blocked key should not abort the rest.
    }
  }
  return changed;
}

export function clearProgress() {
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && isSiteKey(key)) keys.push(key);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // Nothing to clear.
  }
}

// ── Codes and links ────────────────────────────────────────────────────────

const toBase64Url = (bytes: Uint8Array) => {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (code: string) => {
  const s = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
};

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

/** A compact text form: "z" + deflated JSON in base64url where the browser
 *  can compress, otherwise "j" + plain JSON in base64url. */
export async function encodeBackup(backup: Backup): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(backup));
  if (typeof CompressionStream !== 'undefined') {
    return `z${toBase64Url(await pipe(bytes, new CompressionStream('deflate-raw')))}`;
  }
  return `j${toBase64Url(bytes)}`;
}

export async function decodeBackup(code: string): Promise<Backup> {
  const clean = code.trim().replace(/^.*#import=/, '');
  if (!/^[zj][A-Za-z0-9_-]+$/.test(clean)) throw new Error('That code is incomplete or has been changed. Copy it again.');
  let bytes: Uint8Array;
  try {
    bytes = fromBase64Url(clean.slice(1));
    if (clean[0] === 'z') {
      if (typeof DecompressionStream === 'undefined') {
        throw new Error('This browser cannot unpack the code. Use the backup file instead.');
      }
      bytes = await pipe(bytes, new DecompressionStream('deflate-raw'));
    }
  } catch (error) {
    throw error instanceof Error && error.message.startsWith('This browser') ? error : new Error('That code is incomplete or has been changed. Copy it again.');
  }
  if (bytes.length > MAX_BACKUP_BYTES) throw new Error('The backup is too large to be ours.');
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('The backup is empty or damaged.');
  }
  return validateBackup(value);
}
