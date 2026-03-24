import type { PatternStyle } from '@jsfkit/types';
import { PATTERNS } from './constants.ts';
import type { RGB, RGBA } from '../color/types.ts';

/**
 * Return a 64 byte Uint8ClampedArray corresponding to an 8x8
 * pattern. This can then be used in an ImageData interface to
 * paint the pattern on a canvas.
 *
 * @param patternName The name of the pattern.
 * @param patternColor The color for the pattern foreground fill.
 * @param fillColor The color for the pattern background fill.
 * @returns The pattern as a 64 byte Uint8ClampedArray.
 */
export function getPatternData (
  patternName: PatternStyle,
  patternColor: RGBA | RGB,
  fillColor: RGBA | RGB,
): Uint8ClampedArray {
  const P = PATTERNS[patternName] ?? PATTERNS.pct50;
  const uint8c = new Uint8ClampedArray(64);
  for (let i = 0; i < 64; i++) {
    const c = P[i % P.length] === '1' ? patternColor : fillColor;
    uint8c[i * 4 + 0] = c[0];
    uint8c[i * 4 + 1] = c[1];
    uint8c[i * 4 + 2] = c[2];
    uint8c[i * 4 + 3] = c[3] ?? 255;
  }
  return uint8c;
}
