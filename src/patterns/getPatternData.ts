import type { FillPatternStyle, PatternStyle } from '@jsfkit/types';
import { PATTERNS } from './constants.ts';
import type { RGB, RGBA } from '../color/types.ts';

/**
 * Return a 256 byte Uint8ClampedArray corresponding to an 8x8 pattern (of 4 bytes per pixel).
 * This can then be used in an ImageData interface to paint the pattern on a canvas.
 *
 * @param patternName The name of the pattern.
 * @param patternColor The color for the pattern foreground fill.
 * @param fillColor The color for the pattern background fill.
 * @returns The pattern as a 256 byte Uint8ClampedArray.
 */
export function getPatternData (
  patternName: PatternStyle | FillPatternStyle,
  patternColor: RGBA | RGB,
  fillColor: RGBA | RGB,
): Uint8ClampedArray {
  const P = PATTERNS[patternName] ?? PATTERNS.pct50;
  const uint8c = new Uint8ClampedArray(256);
  const [ pR, pG, pB ] = patternColor;
  const pA = (patternColor[3] ?? 1) * 255;
  const [ fR, fG, fB ] = fillColor;
  const fA = (fillColor[3] ?? 1) * 255;
  for (let i = 0; i < 64; i++) {
    if (P[i % P.length] === '1') {
      uint8c[i * 4 + 0] = pR;
      uint8c[i * 4 + 1] = pG;
      uint8c[i * 4 + 2] = pB;
      uint8c[i * 4 + 3] = pA;
    }
    else {
      uint8c[i * 4 + 0] = fR;
      uint8c[i * 4 + 1] = fG;
      uint8c[i * 4 + 2] = fB;
      uint8c[i * 4 + 3] = fA;
    }
  }
  return uint8c;
}
