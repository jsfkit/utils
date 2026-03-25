import type { Color, ThemeColorScheme } from '@jsfkit/types';
import { parseRGBA } from './parseRGBA.ts';
import { hslToRgb } from './hslToRgb.ts';
import { INDEXED_COLORS, DEFAULT_THEME_COLOR_SCHEME, SCHEME_KEYS } from './constants.ts';
import { applyColorTransforms } from './applyColorTransforms.ts';
import type { RGBA } from './types.ts';
import { clamp } from './clamp.ts';

// correct an RGB channel value from 1.0γ to sRGB 2.2γ
const gammaCorrect = (c: number) => {
  const v = Math.max(0, c);
  return v <= 0.0031308
    ? v * 12.92
    : 1.055 * (v ** (1 / 2.4)) - 0.055;
};

/**
 * Resolves a JSF Color object to an RGBA tuple.
 *
 * @param color A JSF Color object.
 * @param [themeColors] A JSF ThemeColorScheme used to resolve Schema colors.
 * @param [indexedColors] A list of 6-digit hex codes to use to
 */
export function toRGBA (
  color: Color,
  themeColors: ThemeColorScheme = DEFAULT_THEME_COLOR_SCHEME,
  indexedColors: string[] = INDEXED_COLORS,
): RGBA {
  let rgba: RGBA = [ 0, 0, 0, 1 ];

  if (color.type === 'theme') {
    // resolve a theme color from a theme
    const key = SCHEME_KEYS[color.value];
    const tColor = themeColors[key];
    // Ensure we don't end up in an infinitely recursing color resolution
    if (tColor.type === 'theme') { return rgba; }
    // themeColor is now a non-theme Color, so we can pass it back through
    return toRGBA(tColor, themeColors, INDEXED_COLORS);
  }

  if (color.type === 'srgb') {
    rgba = parseRGBA(color.value);
  }
  else if (color.type === 'scrgb') {
    rgba = [
      clamp(0, Math.round(gammaCorrect(color.red / 100) * 255), 255),
      clamp(0, Math.round(gammaCorrect(color.green / 100) * 255), 255),
      clamp(0, Math.round(gammaCorrect(color.blue / 100) * 255), 255),
      1,
    ];
  }
  else if (color.type === 'hsl') {
    // hslToRgb expects hue in 0–360, saturation and lightness in 0–1
    rgba = hslToRgb(color.hue, color.saturation / 100, color.lightness / 100);
  }
  else if (color.type === 'system' || color.type === 'preset') {
    rgba = parseRGBA(color.value);
  }
  else if (color.type === 'indexed') {
    rgba = parseRGBA(indexedColors[color.value]);
  }
  // else: "auto" color

  // finally, apply any needed transforms
  if (color.transforms) {
    rgba = applyColorTransforms(rgba, color.transforms);
  }

  return rgba;
}
