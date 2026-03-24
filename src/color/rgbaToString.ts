import { clamp } from './clamp.ts';
import type { RGBA, RGB } from './types.ts';

const hexValue = (n: number) => Math.trunc(clamp(0, n, 255)).toString(16).padStart(2, '0').toUpperCase();

/**
 * Stringify RGBA values into a hex color string without a hash prefix.
 *
 * The output will always be an 8 digit string regardless of the alpha
 * channel value. The channel order is web-style: `RRGGBBAA`
 *
 * @param rgba The RGBA values to render.
 * @returns An 8 digit hex color string (`FFC823FF`).
 */
export function rgbaToString (rgba: RGBA | RGB) {
  const [ r, g, b, a ] = rgba;

  // transparent color
  if (!a) {
    return '00000000';
  }

  return (
    hexValue(r) +
    hexValue(g) +
    hexValue(b) +
    (a !== 1 ? hexValue(a * 255) : 'FF')
  );
}

/**
 * Stringify RGB or RGBA values into a hex color string without a hash prefix.
 *
 * The output will always be a 6 digit string regardless of the alpha
 * channel value.
 *
 * @param rgba The RGBA or RGB values to render.
 * @returns A 6 digit hex color string (`FFC823`).
 */
export function rgbToString (rgba: RGBA | RGB) {
  const [ r, g, b ] = rgba;
  return (
    hexValue(r) +
    hexValue(g) +
    hexValue(b)
  );
}
