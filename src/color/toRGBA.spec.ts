import { describe, it, expect } from 'vitest';
import { toRGBA } from './toRGBA.ts';
import type { AutoColor, Color, SrgbColor, ThemeColorScheme } from '@jsfkit/types';

const srgb = (c: string): SrgbColor => ({ type: 'srgb', value: c });

describe('toRGBA', () => {
  // ── srgb colors ──────────────────────────────────────────────────────

  describe('srgb colors', () => {
    it('parses red FF0000', () => {
      const color: Color = { type: 'srgb', value: 'FF0000' };
      expect(toRGBA(color)).toEqual([ 255, 0, 0, 1 ]);
    });

    it('parses an arbitrary hex color 4472C4', () => {
      const color: Color = { type: 'srgb', value: '4472C4' };
      expect(toRGBA(color)).toEqual([ 68, 114, 196, 1 ]);
    });

    it('parses black 000000', () => {
      const color: Color = { type: 'srgb', value: '000000' };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('parses white FFFFFF', () => {
      const color: Color = { type: 'srgb', value: 'FFFFFF' };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  // ── scrgb colors ─────────────────────────────────────────────────────

  describe('scrgb colors', () => {
    it('converts full red (100, 0, 0) to [255, 0, 0, 1]', () => {
      const color: Color = { type: 'scrgb', red: 100, green: 0, blue: 0 };
      expect(toRGBA(color)).toEqual([ 255, 0, 0, 1 ]);
    });

    it('converts mid-gray (50, 50, 50) to [128, 128, 128, 1]', () => {
      const color: Color = { type: 'scrgb', red: 50, green: 50, blue: 50 };
      expect(toRGBA(color)).toEqual([ 128, 128, 128, 1 ]);
    });

    it('converts black (0, 0, 0) to [0, 0, 0, 1]', () => {
      const color: Color = { type: 'scrgb', red: 0, green: 0, blue: 0 };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('converts full white (100, 100, 100) to [255, 255, 255, 1]', () => {
      const color: Color = { type: 'scrgb', red: 100, green: 100, blue: 100 };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  // ── hsl colors ───────────────────────────────────────────────────────

  describe('hsl colors', () => {
    it('converts pure red (hue=0, sat=100, lum=50)', () => {
      const result = toRGBA({ type: 'hsl', hue: 0, saturation: 100, lightness: 50 });
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('converts pure green (hue=120, sat=100, lum=50)', () => {
      const result = toRGBA({ type: 'hsl', hue: 120, saturation: 100, lightness: 50 });
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });

    it('converts pure blue (hue=240, sat=100, lum=50)', () => {
      const result = toRGBA({ type: 'hsl', hue: 240, saturation: 100, lightness: 50 });
      expect(result).toEqual([ 0, 0, 255, 1 ]);
    });

    it('converts white (hue=0, sat=0, lum=100)', () => {
      const result = toRGBA({ type: 'hsl', hue: 0, saturation: 0, lightness: 100 });
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('converts black (hue=0, sat=0, lum=0)', () => {
      const result = toRGBA({ type: 'hsl', hue: 0, saturation: 0, lightness: 0 });
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── system colors ────────────────────────────────────────────────────

  describe('system colors', () => {
    it('resolves windowText to black', () => {
      const color: Color = { type: 'system', value: 'windowText' };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves window to white', () => {
      const color: Color = { type: 'system', value: 'window' };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  // ── preset colors ────────────────────────────────────────────────────

  describe('preset colors', () => {
    it('resolves "red" to [255, 0, 0, 1]', () => {
      const color: Color = { type: 'preset', value: 'red' };
      expect(toRGBA(color)).toEqual([ 255, 0, 0, 1 ]);
    });

    it('resolves "coral" to [255, 127, 80, 1]', () => {
      const color: Color = { type: 'preset', value: 'coral' };
      expect(toRGBA(color)).toEqual([ 255, 127, 80, 1 ]);
    });

    it('resolves "blue" to [0, 0, 255, 1]', () => {
      const color: Color = { type: 'preset', value: 'blue' };
      expect(toRGBA(color)).toEqual([ 0, 0, 255, 1 ]);
    });
  });

  // ── indexed colors ───────────────────────────────────────────────────

  describe('indexed colors', () => {
    it('resolves index 0 to black [0, 0, 0, 1]', () => {
      const color: Color = { type: 'indexed', value: 0 };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves index 1 to white [255, 255, 255, 1]', () => {
      const color: Color = { type: 'indexed', value: 1 };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });

    it('resolves index 2 to red [255, 0, 0, 1]', () => {
      const color: Color = { type: 'indexed', value: 2 };
      expect(toRGBA(color)).toEqual([ 255, 0, 0, 1 ]);
    });

    it('uses a custom indexed colors array when provided', () => {
      const customIndexed = [ 'ABCDEF', '123456' ];
      expect(toRGBA({ type: 'indexed', value: 0 }, undefined, customIndexed)).toEqual([ 171, 205, 239, 1 ]);
      expect(toRGBA({ type: 'indexed', value: 1 }, undefined, customIndexed)).toEqual([ 18, 52, 86, 1 ]);
    });
  });

  // ── theme colors (default scheme) ────────────────────────────────────

  describe('theme colors (default scheme)', () => {
    it('resolves accent1 to [68, 114, 196, 1]', () => {
      const color: Color = { type: 'theme', value: 'accent1' };
      expect(toRGBA(color)).toEqual([ 68, 114, 196, 1 ]);
    });

    it('resolves dk1 → system windowText → black [0, 0, 0, 1]', () => {
      const color: Color = { type: 'theme', value: 'dk1' };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves lt1 → system window → white [255, 255, 255, 1]', () => {
      const color: Color = { type: 'theme', value: 'lt1' };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });

    it('resolves bg1 → lt1 → white [255, 255, 255, 1]', () => {
      const color: Color = { type: 'theme', value: 'bg1' };
      expect(toRGBA(color)).toEqual([ 255, 255, 255, 1 ]);
    });

    it('resolves tx1 → dk1 → black [0, 0, 0, 1]', () => {
      const color: Color = { type: 'theme', value: 'tx1' };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves bg2 → lt2 → [231, 230, 230, 1]', () => {
      const color: Color = { type: 'theme', value: 'bg2' };
      expect(toRGBA(color)).toEqual([ 231, 230, 230, 1 ]);
    });

    it('resolves tx2 → dk2 → [68, 84, 106, 1]', () => {
      const color: Color = { type: 'theme', value: 'tx2' };
      expect(toRGBA(color)).toEqual([ 68, 84, 106, 1 ]);
    });

    it('resolves accent2 → [237, 125, 49, 1]', () => {
      const color: Color = { type: 'theme', value: 'accent2' };
      expect(toRGBA(color)).toEqual([ 237, 125, 49, 1 ]);
    });
  });

  // ── theme colors (custom scheme) ─────────────────────────────────────

  describe('theme colors with custom theme', () => {
    it('resolves accent1 from a custom theme', () => {
      const customTheme = {
        name: 'Custom',
        dk1: srgb('111111'),
        lt1: srgb('EEEEEE'),
        dk2: srgb('222222'),
        lt2: srgb('DDDDDD'),
        accent1: srgb('AA0000'),
        accent2: srgb('00AA00'),
        accent3: srgb('0000AA'),
        accent4: srgb('AAAA00'),
        accent5: srgb('AA00AA'),
        accent6: srgb('00AAAA'),
        hlink: srgb('3366CC'),
        folHlink: srgb('CC6633'),
      };
      expect(toRGBA({ type: 'theme', value: 'accent1' }, customTheme)).toEqual([ 170, 0, 0, 1 ]);
      expect(toRGBA({ type: 'theme', value: 'hlink' }, customTheme)).toEqual([ 51, 102, 204, 1 ]);
    });

    it('resolves dk1 from a custom theme with srgb value', () => {
      const customTheme = {
        name: 'Custom',
        dk1: srgb('112233'),
        lt1: srgb('FFFFFF'),
        dk2: srgb('000000'),
        lt2: srgb('CCCCCC'),
        accent1: srgb('FF0000'),
        accent2: srgb('00FF00'),
        accent3: srgb('0000FF'),
        accent4: srgb('FFFF00'),
        accent5: srgb('FF00FF'),
        accent6: srgb('00FFFF'),
        hlink: srgb('0000FF'),
        folHlink: srgb('800080'),
      };
      expect(toRGBA({ type: 'theme', value: 'dk1' }, customTheme)).toEqual([ 17, 34, 51, 1 ]);
      expect(toRGBA({ type: 'theme', value: 'hlink' }, customTheme)).toEqual([ 0, 0, 255, 1 ]);
    });
  });

  // ── theme color infinite recursion guard ─────────────────────────────

  describe('theme color infinite recursion guard', () => {
    it('returns [0, 0, 0, 1] when a theme color resolves to another theme color', () => {
      const recursiveTheme: ThemeColorScheme = {
        name: 'Recursive',
        dk1: { type: 'theme', value: 'accent1' },
        lt1: srgb('FFFFFF'),
        dk2: srgb('000000'),
        lt2: srgb('CCCCCC'),
        accent1: srgb('FF0000'),
        accent2: srgb('00FF00'),
        accent3: srgb('0000FF'),
        accent4: srgb('FFFF00'),
        accent5: srgb('FF00FF'),
        accent6: srgb('00FFFF'),
        hlink: srgb('0000FF'),
        folHlink: srgb('800080'),
      };
      const color: Color = { type: 'theme', value: 'dk1' };
      // dk1 resolves to a Color with type 'theme', so the guard triggers
      expect(toRGBA(color, recursiveTheme)).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── auto color ───────────────────────────────────────────────────────

  describe('auto color', () => {
    it('returns default [0, 0, 0, 1] for auto type', () => {
      const color: AutoColor = { type: 'auto' };
      expect(toRGBA(color)).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── transforms ───────────────────────────────────────────────────────

  describe('transforms', () => {
    it('applies alpha transform to reduce opacity', () => {
      const color = {
        type: 'srgb',
        value: 'FF0000',
        transforms: [ { type: 'alpha', value: 50 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 255, 0, 0, 0.5 ]);
    });

    it('applies alpha transform with value 0 for fully transparent', () => {
      const color = {
        type: 'srgb',
        value: 'FF0000',
        transforms: [ { type: 'alpha', value: 0 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 255, 0, 0, 0 ]);
    });

    it('applies alpha transform with value 100 for fully opaque', () => {
      const color = {
        type: 'srgb',
        value: 'FF0000',
        transforms: [ { type: 'alpha', value: 100 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('applies tint transform to lighten a color', () => {
      const color = {
        type: 'srgb',
        value: '000000',
        transforms: [ { type: 'tint', value: 50 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 127, 127, 127, 1 ]);
    });

    it('applies shade transform to darken a color', () => {
      const color = {
        type: 'srgb',
        value: 'FFFFFF',
        transforms: [ { type: 'shade', value: 50 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 127, 127, 127, 1 ]);
    });

    it('applies multiple transforms in sequence', () => {
      const color = {
        type: 'srgb',
        value: 'FF0000',
        transforms: [
          { type: 'alpha', value: 75 },
          { type: 'tint', value: 50 },
        ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 255, 127, 127, 0.75 ]);
    });

    it('applies lumMod transform', () => {
      const color = {
        type: 'srgb',
        value: 'FF0000',
        transforms: [ { type: 'lumMod', value: 50 } ],
      } as Color;
      const result = toRGBA(color);
      expect(result).toEqual([ 127, 0, 0, 1 ]);
    });

    it('does not apply transforms when transforms property is absent', () => {
      const color: Color = { type: 'srgb', value: 'FF0000' };
      expect(toRGBA(color)).toEqual([ 255, 0, 0, 1 ]);
    });
  });

  // ── edge cases ───────────────────────────────────────────────────────

  describe('edge cases', () => {
    it('returns default rgba for unmatched color type (auto has no branch)', () => {
      const result = toRGBA({ type: 'auto' });
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('handles scrgb with fractional percentages via Math.round', () => {
      const result = toRGBA({ type: 'scrgb', red: 33.33, green: 66.66, blue: 99.99 });
      expect(result).toEqual([ 85, 170, 255, 1 ]);
    });

    it('theme phClr maps to lt1', () => {
      const result = toRGBA({ type: 'theme', value: 'phClr' });
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });
  });
});
