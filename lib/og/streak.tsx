/** The practice-streak share card, drawn from the share URL's numbers. */

import { renderOgCard, StreakVisual } from "@/lib/og/card";
import { streakTitle, type StreakCardParams } from "@/lib/streakShare";

export { parseStreakParams, streakQuery, streakTitle } from "@/lib/streakShare";

export function streakOgImage({ days, best, last30 }: StreakCardParams) {
  return renderOgCard({
    eyebrow: "Practice streak",
    title: streakTitle(days),
    subtitle: `Best streak ${best} day${best === 1 ? "" : "s"} · practised ${last30} of the last 30 days.`,
    visual: <StreakVisual days={days} label={days === 1 ? "day" : "days in a row"} />,
    footnote: "Start your own streak — free, no sign-up",
  });
}
