/** Well-known progressions, keyed by the numeral this chord occupies. */
export const PROGRESSIONS: Record<string, { pattern: string; note: string }[]> = {
  I: [
    { pattern: "I – V – vi – IV", note: "the most common progression in pop" },
    { pattern: "I – IV – V", note: "the backbone of blues and early rock" },
  ],
  ii: [
    { pattern: "ii – V – I", note: "the central cadence in jazz" },
    { pattern: "I – vi – ii – V", note: "the 1950s doo-wop turnaround" },
  ],
  iii: [{ pattern: "I – iii – IV – V", note: "a bright, lifting movement" }],
  IV: [
    { pattern: "I – IV – V", note: "the backbone of blues and early rock" },
    { pattern: "vi – IV – I – V", note: "the pop-punk staple" },
  ],
  V: [
    { pattern: "ii – V – I", note: "the central cadence in jazz" },
    { pattern: "V – I", note: "the strongest resolution in tonal music" },
  ],
  vi: [
    { pattern: "vi – IV – I – V", note: "the pop-punk staple" },
    { pattern: "I – V – vi – IV", note: "the most common progression in pop" },
  ],
  "vii°": [
    { pattern: "vii° – I", note: "a tense chord resolving straight home" },
  ],
};
