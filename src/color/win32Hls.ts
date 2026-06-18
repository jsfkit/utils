import type { RGB } from './types.ts';

// Win32 GDI integer HLS round-trip (the classic `ColorRGBToHLS` / `ColorHLSToRGB` from Microsoft
// KB Q29240), reproduced faithfully. Excel resolves a theme colour + tint by converting the base
// RGB to integer HLS, scaling the luminance by the tint, and converting back -- all in integer
// arithmetic over a 240-step hue/luminance/saturation space (HLSMAX) and an 8-bit RGB space
// (RGBMAX). This wobble-prone round-trip, not the ECMA-376 §18.3.1.4 float-HSL formula, is what
// Excel actually emits; matching it bit-for-bit is the point of this module (PRODUCT-11093).

const HLSMAX = 240;
const RGBMAX = 255;
const UNDEFINED = Math.trunc((HLSMAX * 2) / 3);

// C integer division truncates toward zero. The original routine is pure-integer C, so every
// quotient below must truncate -- using `Math.round` here (as an earlier attempt did) is the
// classic way to miss Excel by ±1 per channel.
const idiv = (a: number, b: number): number => Math.trunc(a / b);

function rgbToHls ([ R, G, B ]: RGB): [ number, number, number ] {
  const cMax = Math.max(R, G, B);
  const cMin = Math.min(R, G, B);
  const L = idiv((cMax + cMin) * HLSMAX + RGBMAX, 2 * RGBMAX);
  if (cMax === cMin) {
    return [ UNDEFINED, L, 0 ];
  }
  const sum = cMax + cMin;
  const diff = cMax - cMin;
  const S = L <= HLSMAX / 2
    ? idiv(diff * HLSMAX + idiv(sum, 2), sum)
    : idiv(diff * HLSMAX + idiv(2 * RGBMAX - sum, 2), 2 * RGBMAX - sum);
  const Rdelta = idiv((cMax - R) * idiv(HLSMAX, 6) + idiv(diff, 2), diff);
  const Gdelta = idiv((cMax - G) * idiv(HLSMAX, 6) + idiv(diff, 2), diff);
  const Bdelta = idiv((cMax - B) * idiv(HLSMAX, 6) + idiv(diff, 2), diff);
  let H: number;
  if (R === cMax) {
    H = Bdelta - Gdelta;
  }
  else if (G === cMax) {
    H = idiv(HLSMAX, 3) + Rdelta - Bdelta;
  }
  else {
    H = idiv((2 * HLSMAX), 3) + Gdelta - Rdelta;
  }
  if (H < 0) {
    H += HLSMAX;
  }
  if (H > HLSMAX) {
    H -= HLSMAX;
  }
  return [ H, L, S ];
}

function hueToRgb (n1: number, n2: number, hue: number): number {
  if (hue < 0) {
    hue += HLSMAX;
  }
  if (hue > HLSMAX) {
    hue -= HLSMAX;
  }
  if (hue < idiv(HLSMAX, 6)) {
    return n1 + idiv((n2 - n1) * hue + idiv(HLSMAX, 12), idiv(HLSMAX, 6));
  }
  if (hue < idiv(HLSMAX, 2)) {
    return n2;
  }
  if (hue < idiv(HLSMAX * 2, 3)) {
    return n1 + idiv((n2 - n1) * (idiv(HLSMAX * 2, 3) - hue) + idiv(HLSMAX, 12), idiv(HLSMAX, 6));
  }
  return n1;
}

function hlsToRgb (H: number, L: number, S: number): RGB {
  if (S === 0) {
    // Achromatic. Excel rounds the grey back to 8-bit with the same +HLSMAX/2 half-add it uses on
    // the chromatic channels; the KB sample omits it here, which costs a ±1 on grey slots.
    const v = idiv(L * RGBMAX + idiv(HLSMAX, 2), HLSMAX);
    return [ v, v, v ];
  }
  const magic2 = L <= HLSMAX / 2
    ? idiv(L * (HLSMAX + S) + idiv(HLSMAX, 2), HLSMAX)
    : L + S - idiv(L * S + idiv(HLSMAX, 2), HLSMAX);
  const magic1 = 2 * L - magic2;
  function channel (hue: number): number {
    return idiv(hueToRgb(magic1, magic2, hue) * RGBMAX + idiv(HLSMAX, 2), HLSMAX);
  }
  return [
    channel(H + idiv(HLSMAX, 3)),
    channel(H),
    channel(H - idiv(HLSMAX, 3)),
  ];
}

// The tinted luminance is computed in floating point, then truncated to an integer before the
// back-conversion (matching how Excel applies the tint in HLS space). A small epsilon absorbs the
// sub-LSB deficit left by Excel's int16 tint coercion (n/32767): a nominal +0.4 tint stored as
// 0.39997558 yields e.g. L=155.9966, whose intended integer is 156, not 155. The deficit never
// exceeds ~0.004, and the smallest genuine fractional luminance observed is 0.95, so the epsilon
// has a wide safe margin and never promotes a value that should truncate down.
const LUM_EPSILON = 0.01;

/**
 * Resolve a base RGB colour and a spreadsheet theme tint to a concrete RGB, reproducing Excel's
 * integer Win32-HLS round-trip exactly.
 *
 * @param rgb The base RGB colour (channels 0–255).
 * @param tint The theme tint in [-1, 1]: negative darkens (`L * (1 + tint)`), positive lightens
 *   (`L * (1 - tint) + HLSMAX * tint`). A tint of 0 returns the base unchanged.
 * @returns The tinted RGB with integer channels.
 */
export function tintHls (rgb: RGB, tint: number): RGB {
  if (!tint) {
    return [ rgb[0], rgb[1], rgb[2] ];
  }
  // The HLS round-trip is defined on 8-bit integer channels (as Excel tints an already-resolved
  // colour); round any fractional input before converting.
  const [ H, L, S ] = rgbToHls([ Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]) ]);
  const luminance = tint < 0
    ? L * (1 + tint)
    : L * (1 - tint) + HLSMAX * tint;
  return hlsToRgb(H, Math.trunc(luminance + LUM_EPSILON), S);
}
