import { tintHls } from './win32Hls.ts';

/**
 * Apply a spreadsheet theme tint to an RGB colour.
 *
 * `amount` is the theme tint in [-1, 1]: negative darkens, positive lightens, 0 is a no-op. Values
 * outside [-1, 1] are not clamped, so an out-of-range tint can yield out-of-bounds channels. This
 * reproduces Excel's integer Win32-HLS round-trip (see {@link tintHls}) rather than the ECMA-376
 * float-HSL formula, so the result matches what Excel resolves for `<color theme … tint=…>`.
 */
export function tint (
  r: number,
  g: number,
  b: number,
  amount: number,
): [ number, number, number ] | [ number, number, number, number ] {
  if (amount) {
    const [ tr, tg, tb ] = tintHls([ r, g, b ], amount);
    return [ tr, tg, tb, 1 ];
  }
  return [ r, g, b ];
}
