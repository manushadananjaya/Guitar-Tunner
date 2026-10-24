/** Practice-streak share links. The numbers travel in the URL, since
 *  streaks live on the visitor's device and never reach the server — so they
 *  are clamped and treated as claims, not records. Shared by the share
 *  button (client) and the card and landing page (server). */

export interface StreakCardParams {
  /** Current streak in days. */
  days: number;
  best: number;
  /** Days practised in the last 30. */
  last30: number;
}

const clampInt = (value: string | string[] | null | undefined, max: number) => {
  const n = Number.parseInt(Array.isArray(value) ? value[0] : value ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0;
};

export function parseStreakParams(get: (key: string) => string | string[] | null | undefined): StreakCardParams {
  const days = clampInt(get("d"), 3650);
  return {
    days,
    best: Math.max(days, clampInt(get("b"), 3650)),
    last30: Math.min(30, clampInt(get("m"), 30)),
  };
}

export const streakQuery = ({ days, best, last30 }: StreakCardParams) =>
  `d=${days}&b=${best}&m=${last30}`;

export const streakTitle = (days: number) =>
  days > 0 ? `${days}-day practice streak` : "Start a practice streak";
