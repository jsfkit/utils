import { describe, it, expect } from 'vitest';
import { rgbaToString, rgbToString } from './rgbaToString.ts';
import type { RGBA, RGB } from './types.ts';

describe('rgbaToString', () => {
  describe('opaque colors (alpha = 1)', () => {
    it('returns an 8-digit string ending in FF', () => {
      const result = rgbaToString([ 128, 64, 32, 1 ]);
      expect(result).toBe('804020FF');
    });

    it('returns FF suffix for pure red', () => {
      expect(rgbaToString([ 255, 0, 0, 1 ])).toBe('FF0000FF');
    });

    it('returns FF suffix for pure green', () => {
      expect(rgbaToString([ 0, 255, 0, 1 ])).toBe('00FF00FF');
    });

    it('returns FF suffix for pure blue', () => {
      expect(rgbaToString([ 0, 0, 255, 1 ])).toBe('0000FFFF');
    });

    it('returns FF suffix for white', () => {
      expect(rgbaToString([ 255, 255, 255, 1 ])).toBe('FFFFFFFF');
    });

    it('returns FF suffix for black', () => {
      expect(rgbaToString([ 0, 0, 0, 1 ])).toBe('000000FF');
    });
  });

  describe('semi-transparent colors', () => {
    it('converts 50% alpha correctly', () => {
      // 0.5 * 255 = 127.5, truncated to 127 = 0x7F
      expect(rgbaToString([ 255, 0, 0, 0.5 ])).toBe('FF00007F');
    });

    it('converts 75% alpha correctly', () => {
      // 0.75 * 255 = 191.25, truncated to 191 = 0xBF
      expect(rgbaToString([ 0, 255, 0, 0.75 ])).toBe('00FF00BF');
    });

    it('converts very low alpha correctly', () => {
      // 0.1 * 255 = 25.5, truncated to 25 = 0x19
      expect(rgbaToString([ 0, 0, 255, 0.1 ])).toBe('0000FF19');
    });

    it('converts near-opaque alpha correctly', () => {
      // 0.99 * 255 = 252.45, truncated to 252 = 0xFC
      expect(rgbaToString([ 255, 255, 255, 0.99 ])).toBe('FFFFFFFC');
    });
  });

  describe('fully transparent (alpha = 0)', () => {
    it('returns 00000000 regardless of RGB values', () => {
      expect(rgbaToString([ 255, 128, 64, 0 ])).toBe('00000000');
    });

    it('returns 00000000 for black with zero alpha', () => {
      expect(rgbaToString([ 0, 0, 0, 0 ])).toBe('00000000');
    });

    it('returns 00000000 for white with zero alpha', () => {
      expect(rgbaToString([ 255, 255, 255, 0 ])).toBe('00000000');
    });
  });

  describe('RGB tuple (no alpha)', () => {
    it('returns 00000000 when alpha is undefined', () => {
      const rgb: RGB = [ 255, 0, 0 ];
      expect(rgbaToString(rgb)).toBe('00000000');
    });

    it('returns 00000000 for a black RGB tuple', () => {
      const rgb: RGB = [ 0, 0, 0 ];
      expect(rgbaToString(rgb)).toBe('00000000');
    });

    it('returns 00000000 for an arbitrary RGB tuple', () => {
      const rgb: RGB = [ 100, 150, 200 ];
      expect(rgbaToString(rgb)).toBe('00000000');
    });
  });

  describe('channel value clamping', () => {
    it('clamps channel values greater than 255 to FF', () => {
      expect(rgbaToString([ 300, 400, 500, 1 ])).toBe('FFFFFFFF');
    });

    it('clamps channel values less than 0 to 00', () => {
      expect(rgbaToString([ -10, -50, -100, 1 ])).toBe('000000FF');
    });

    it('clamps a mix of out-of-range values', () => {
      expect(rgbaToString([ 300, -1, 128, 1 ])).toBe('FF0080FF');
    });
  });

  describe('fractional channel values are truncated', () => {
    it('truncates fractional R value', () => {
      // 128.9 truncated = 128 = 0x80
      expect(rgbaToString([ 128.9, 0, 0, 1 ])).toBe('800000FF');
    });

    it('truncates fractional G value', () => {
      // 64.7 truncated = 64 = 0x40
      expect(rgbaToString([ 0, 64.7, 0, 1 ])).toBe('004000FF');
    });

    it('truncates fractional B value', () => {
      // 255.9 clamped to 255, truncated = 255 = 0xFF
      expect(rgbaToString([ 0, 0, 255.9, 1 ])).toBe('0000FFFF');
    });

    it('truncates all fractional channel values', () => {
      // 10.9 -> 10 = 0x0A, 20.5 -> 20 = 0x14, 30.1 -> 30 = 0x1E
      expect(rgbaToString([ 10.9, 20.5, 30.1, 1 ])).toBe('0A141EFF');
    });
  });
});

describe('rgbToString', () => {
  describe('returns 6-digit hex string', () => {
    it('converts black correctly', () => {
      expect(rgbToString([ 0, 0, 0 ])).toBe('000000');
    });

    it('converts white correctly', () => {
      expect(rgbToString([ 255, 255, 255 ])).toBe('FFFFFF');
    });

    it('converts pure red correctly', () => {
      expect(rgbToString([ 255, 0, 0 ])).toBe('FF0000');
    });

    it('converts pure green correctly', () => {
      expect(rgbToString([ 0, 255, 0 ])).toBe('00FF00');
    });

    it('converts pure blue correctly', () => {
      expect(rgbToString([ 0, 0, 255 ])).toBe('0000FF');
    });

    it('always returns exactly 6 characters', () => {
      expect(rgbToString([ 1, 2, 3 ])).toHaveLength(6);
      expect(rgbToString([ 255, 255, 255 ])).toHaveLength(6);
    });
  });

  describe('arbitrary colors', () => {
    it('converts an arbitrary color', () => {
      // 171 = 0xAB, 205 = 0xCD, 239 = 0xEF
      expect(rgbToString([ 171, 205, 239 ])).toBe('ABCDEF');
    });

    it('converts another arbitrary color', () => {
      // 255 = 0xFF, 200 = 0xC8, 35 = 0x23
      expect(rgbToString([ 255, 200, 35 ])).toBe('FFC823');
    });
  });

  describe('ignores alpha channel', () => {
    it('produces the same result regardless of alpha value', () => {
      const rgba: RGBA = [ 255, 128, 64, 0.5 ];
      const rgb: RGB = [ 255, 128, 64 ];
      expect(rgbToString(rgba)).toBe(rgbToString(rgb));
    });

    it('ignores zero alpha', () => {
      expect(rgbToString([ 255, 128, 64, 0 ] as RGBA)).toBe('FF8040');
    });

    it('ignores full alpha', () => {
      expect(rgbToString([ 255, 128, 64, 1 ] as RGBA)).toBe('FF8040');
    });
  });

  describe('works with both RGB and RGBA tuples', () => {
    it('accepts an RGB tuple', () => {
      const rgb: RGB = [ 100, 150, 200 ];
      expect(rgbToString(rgb)).toBe('6496C8');
    });

    it('accepts an RGBA tuple', () => {
      const rgba: RGBA = [ 100, 150, 200, 0.8 ];
      expect(rgbToString(rgba)).toBe('6496C8');
    });
  });
});
