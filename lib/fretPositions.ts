/** Distance from the nut to fret n on an equal-tempered fretboard: each fret
 *  shortens the vibrating length by a factor of 2^(1/12). Shared by the fret
 *  calculator and its page's worked example, so the two always agree. */
export const fretPosition = (scale: number, n: number) => scale - scale / Math.pow(2, n / 12);
