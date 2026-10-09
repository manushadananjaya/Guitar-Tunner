/** On-device practice log: which days you practised, for how long, and with
 *  which tools. Drives the streak and calendar on the practice routine page;
 *  the ear trainer, fretboard trainer, and strumming trainer write to it so a
 *  day spent on any of them counts.
 *
 *  Local storage only — no account, nothing sent anywhere. Every access is
 *  wrapped because storage can be blocked or full. */

const STORAGE_KEY = 'gtp-practice-log';

export interface PracticeDay {
  /** Minutes from timed routine steps. Free play in the tools is not timed. */
  minutes: number;
  /** Tool ids used that day, e.g. "ear-training". */
  activities: string[];
  /** Full routines finished that day. */
  routines: number;
}

export type PracticeLog = Record<string, PracticeDay>;

/** Local calendar date, YYYY-MM-DD. Not toISOString(), which is UTC and
 *  would roll the day over at the wrong hour for most of the world. */
export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function loadLog(): PracticeLog {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as PracticeLog) : {};
  } catch {
    return {};
  }
}

function saveLog(log: PracticeLog) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  } catch {
    // Storage blocked: the tools still work, the streak just won't stick.
  }
}

/** Record practice for today. Safe to call repeatedly — an activity is
 *  stored once per day, minutes accumulate. */
export function logPractice(
  activity: string,
  { minutes = 0, routineComplete = false }: { minutes?: number; routineComplete?: boolean } = {},
): PracticeLog {
  const log = loadLog();
  const key = dateKey(new Date());
  const day = log[key] ?? { minutes: 0, activities: [], routines: 0 };
  log[key] = {
    minutes: Math.round((day.minutes + minutes) * 10) / 10,
    activities: day.activities.includes(activity) ? day.activities : [...day.activities, activity],
    routines: day.routines + (routineComplete ? 1 : 0),
  };
  saveLog(log);
  return log;
}

/** Consecutive practice days ending today — or ending yesterday, so the
 *  streak does not read zero in the morning before you have played. */
export function currentStreak(log: PracticeLog, today = new Date()): number {
  const cursor = new Date(today);
  if (!log[dateKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (log[dateKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function bestStreak(log: PracticeLog): number {
  const days = Object.keys(log).sort();
  let best = 0;
  let run = 0;
  let previous: Date | null = null;
  for (const key of days) {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const consecutive =
      previous !== null && Math.round((date.getTime() - previous.getTime()) / 86_400_000) === 1;
    run = consecutive ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  }
  return best;
}

/** A stable index for "of the day" picks: the same all day, different
 *  tomorrow, identical for everyone. */
export function dayIndex(date = new Date()): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
}
