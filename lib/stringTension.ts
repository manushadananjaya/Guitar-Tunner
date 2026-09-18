/** String tension from gauge, scale length, and pitch.
 *
 *  T = UW · (2 · L · F)² / 386.4
 *
 *  T is tension in pounds, UW the string's unit weight in lb/in, L the
 *  vibrating length in inches, F the frequency in Hz. 386.4 is g in in/s².
 *  This is the formula every string maker publishes; the only part that
 *  differs between makers is the unit weight of their wound strings.
 *
 *  Unit weights:
 *  - Plain steel is exact from geometry: a solid cylinder of steel at
 *    0.2833 lb/in³. This lands within 1% of the values on published charts.
 *  - Wound strings have a steel core and a wrap of nickel-plated steel, and
 *    the core-to-wrap ratio varies with gauge. We fit a quadratic to
 *    published nickel-wound unit weights; it sits within ~3% across the
 *    .020–.060 range, which is closer than the difference between brands.
 *    Bronze-wound acoustic strings are within a similar margin.
 *
 *  Treat the output as a good estimate, not a lab measurement. The useful
 *  numbers are the ratios — how much lighter Drop C feels than standard on
 *  the same set — and those are insensitive to the small absolute error. */

const STEEL_DENSITY = 0.2833; // lb/in³
const GRAVITY = 386.4; // in/s²

export type StringKind = "plain" | "wound";

export function unitWeight(gauge: number, kind: StringKind): number {
  if (kind === "plain") {
    return (Math.PI / 4) * gauge * gauge * STEEL_DENSITY;
  }
  // Effective density coefficient falls slightly with gauge because heavier
  // wraps leave proportionally more air between the windings.
  return gauge * gauge * (0.196 - 0.3 * gauge);
}

export function tensionLb(
  gauge: number,
  kind: StringKind,
  scaleInches: number,
  hz: number,
): number {
  const uw = unitWeight(gauge, kind);
  const v = 2 * scaleInches * hz;
  return (uw * v * v) / GRAVITY;
}

export const lbToKg = (lb: number) => lb * 0.45359237;

export const midiToHz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** A gauge of .020 and above is almost always wound; below it, plain. Sets
 *  with a wound .018–.020 3rd exist, so the UI lets this be overridden. */
export const defaultKind = (gauge: number): StringKind =>
  gauge >= 0.02 ? "wound" : "plain";

export interface StringSet {
  key: string;
  name: string;
  /** Gauges in inches, string 6 (thickest) first. */
  gauges: number[];
  category: "Electric" | "Acoustic";
}

export const STRING_SETS: StringSet[] = [
  { key: "e08", name: "8–38 Extra Super Light", gauges: [0.038, 0.03, 0.021, 0.015, 0.011, 0.008], category: "Electric" },
  { key: "e09", name: "9–42 Super Light", gauges: [0.042, 0.032, 0.024, 0.016, 0.011, 0.009], category: "Electric" },
  { key: "e0946", name: "9–46 Light Top / Heavy Bottom", gauges: [0.046, 0.036, 0.026, 0.016, 0.011, 0.009], category: "Electric" },
  { key: "e10", name: "10–46 Regular Light", gauges: [0.046, 0.036, 0.026, 0.017, 0.013, 0.01], category: "Electric" },
  { key: "e1052", name: "10–52 Light Top / Heavy Bottom", gauges: [0.052, 0.042, 0.03, 0.017, 0.013, 0.01], category: "Electric" },
  { key: "e11", name: "11–49 Medium", gauges: [0.049, 0.038, 0.028, 0.018, 0.014, 0.011], category: "Electric" },
  { key: "e1152", name: "11–52 Medium / Heavy Bottom", gauges: [0.052, 0.044, 0.032, 0.019, 0.014, 0.011], category: "Electric" },
  { key: "e12", name: "12–54 Heavy", gauges: [0.054, 0.042, 0.032, 0.02, 0.016, 0.012], category: "Electric" },
  { key: "e13", name: "13–56 Baritone / Extra Heavy", gauges: [0.056, 0.044, 0.034, 0.024, 0.017, 0.013], category: "Electric" },
  { key: "a10", name: "10–47 Extra Light", gauges: [0.047, 0.039, 0.03, 0.023, 0.014, 0.01], category: "Acoustic" },
  { key: "a11", name: "11–52 Custom Light", gauges: [0.052, 0.042, 0.032, 0.023, 0.015, 0.011], category: "Acoustic" },
  { key: "a12", name: "12–53 Light", gauges: [0.053, 0.042, 0.032, 0.024, 0.016, 0.012], category: "Acoustic" },
  { key: "a13", name: "13–56 Medium", gauges: [0.056, 0.045, 0.035, 0.026, 0.017, 0.013], category: "Acoustic" },
];

export interface ScaleLength {
  inches: number;
  label: string;
}

export const SCALE_LENGTHS: ScaleLength[] = [
  { inches: 24, label: '24" — Jaguar, Mustang' },
  { inches: 24.75, label: '24.75" — Gibson, Epiphone' },
  { inches: 25, label: '25" — PRS' },
  { inches: 25.4, label: '25.4" — Martin' },
  { inches: 25.5, label: '25.5" — Fender, Ibanez, most acoustics' },
  { inches: 26.5, label: '26.5" — Baritone (short)' },
  { inches: 27, label: '27" — Baritone' },
];

/** Gauges a shop actually stocks as singles, for recommendations. */
export const PLAIN_GAUGES = [
  0.008, 0.009, 0.0095, 0.01, 0.0105, 0.011, 0.0115, 0.012, 0.013, 0.014,
  0.015, 0.016, 0.017, 0.018, 0.019, 0.02, 0.022,
];
export const WOUND_GAUGES = [
  0.02, 0.021, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038,
  0.039, 0.042, 0.044, 0.046, 0.048, 0.049, 0.052, 0.054, 0.056, 0.059, 0.06,
  0.062, 0.064, 0.066, 0.068, 0.07, 0.072, 0.074, 0.08,
];

/** The stocked gauge whose tension at `hz` comes closest to `targetLb`. */
export function closestGauge(
  kind: StringKind,
  scaleInches: number,
  hz: number,
  targetLb: number,
): number {
  const candidates = kind === "plain" ? PLAIN_GAUGES : WOUND_GAUGES;
  let best = candidates[0];
  let bestDiff = Infinity;
  for (const gauge of candidates) {
    const diff = Math.abs(tensionLb(gauge, kind, scaleInches, hz) - targetLb);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = gauge;
    }
  }
  return best;
}

/** Format .046 as "046" and .0095 as "0095", the way sets are labelled. */
export const formatGauge = (gauge: number) =>
  gauge.toFixed(4).replace(/^0\./, "").replace(/0+$/, "").padEnd(3, "0");
