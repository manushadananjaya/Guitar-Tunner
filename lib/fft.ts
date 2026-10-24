/** Autocorrelation by FFT, for the pitch detector.
 *
 *  The direct sum r[lag] = Σ x[i]·x[i+lag] costs window × lags operations —
 *  about five million per frame for a 4096-sample window searched down to
 *  40 Hz, run up to 60 times a second on the main thread. The Wiener–
 *  Khinchin route (FFT, squared magnitude, inverse FFT) gives the same
 *  numbers in O(n log n). Zero-padding to at least twice the window keeps
 *  it a linear rather than circular correlation, so every lag below the
 *  window length matches the direct sum up to floating-point rounding. */

interface Plan {
  size: number;
  cos: Float64Array;
  sin: Float64Array;
  rev: Uint32Array;
}

const plans = new Map<number, Plan>();

function plan(size: number): Plan {
  let p = plans.get(size);
  if (p) return p;
  const bits = Math.log2(size);
  const rev = new Uint32Array(size);
  for (let i = 0; i < size; i++) {
    let r = 0;
    for (let b = 0; b < bits; b++) r |= ((i >> b) & 1) << (bits - 1 - b);
    rev[i] = r;
  }
  const half = size / 2;
  const cos = new Float64Array(half);
  const sin = new Float64Array(half);
  for (let i = 0; i < half; i++) {
    cos[i] = Math.cos((2 * Math.PI * i) / size);
    sin[i] = -Math.sin((2 * Math.PI * i) / size);
  }
  p = { size, cos, sin, rev };
  plans.set(size, p);
  return p;
}

/** In-place iterative radix-2 FFT. `inverse` conjugates the twiddles; the
 *  caller scales by 1/size. */
function fft(re: Float64Array, im: Float64Array, p: Plan, inverse: boolean) {
  const n = p.size;
  for (let i = 0; i < n; i++) {
    const j = p.rev[i];
    if (j > i) {
      let t = re[i];
      re[i] = re[j];
      re[j] = t;
      t = im[i];
      im[i] = im[j];
      im[j] = t;
    }
  }
  const sign = inverse ? -1 : 1;
  for (let len = 2; len <= n; len <<= 1) {
    const halfLen = len >> 1;
    const step = n / len;
    for (let start = 0; start < n; start += len) {
      for (let k = 0; k < halfLen; k++) {
        const wr = p.cos[k * step];
        const wi = sign * p.sin[k * step];
        const a = start + k;
        const b = a + halfLen;
        const xr = re[b] * wr - im[b] * wi;
        const xi = re[b] * wi + im[b] * wr;
        re[b] = re[a] - xr;
        im[b] = im[a] - xi;
        re[a] += xr;
        im[a] += xi;
      }
    }
  }
}

/** r[lag] = Σ x[i]·x[i+lag] for lag in [0, lags), same as the direct sum. */
export function autocorrelate(x: Float32Array, lags: number): Float32Array {
  const n = x.length;
  let size = 1;
  while (size < 2 * n) size <<= 1;
  const p = plan(size);
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  for (let i = 0; i < n; i++) re[i] = x[i];
  fft(re, im, p, false);
  for (let i = 0; i < size; i++) {
    re[i] = re[i] * re[i] + im[i] * im[i];
    im[i] = 0;
  }
  fft(re, im, p, true);
  const out = new Float32Array(n);
  const count = Math.min(lags, n);
  for (let lag = 0; lag < count; lag++) out[lag] = re[lag] / size;
  return out;
}
