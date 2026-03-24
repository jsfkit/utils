import { SYSTEM_COLORS, PRESET_COLORS } from './constants.ts';
import type { RGBA } from './types.ts';

/**
 * Parse a hex color string into an RGBA channel set.
 *
 * @param value The string to parse.
 * @returns A list of the R, G, B, and A channels.
 */
export function parseRGBA (value?: string): RGBA {
  if (!value) {
    return [ 0, 0, 0, 1 ];
  }
  if (value in SYSTEM_COLORS) {
    value = SYSTEM_COLORS[value];
  }
  if (value in PRESET_COLORS) {
    value = PRESET_COLORS[value];
  }
  // remove '#' prefix, if it is there
  if (value.charCodeAt(0) === 35) {
    value = value.slice(1);
  }
  if (value.length === 8) {
    const c = parseInt(value, 16);
    return [
      c >> 24 & 0xff,
      c >> 16 & 0xff,
      c >> 8 & 0xff,
      (c & 0xff) / 255,
    ];
  }
  if (value.length === 6) {
    const c = parseInt(value, 16);
    return [
      c >> 16 & 0xff,
      c >> 8 & 0xff,
      c & 0xff,
      1,
    ];
  }
  throw new Error('Cannot parse color: ' + value);
}
