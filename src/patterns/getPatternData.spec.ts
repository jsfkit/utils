import { describe, it, expect } from 'vitest';
import { getPatternData } from './getPatternData.ts';
import type { RGBA, RGB } from '../color/types.ts';

describe('getPatternData', () => {
  const BLACK: RGBA = [ 0, 0, 0, 1 ];
  const WHITE: RGBA = [ 255, 255, 255, 1 ];
  const RED: RGBA = [ 255, 0, 0, 1 ];
  const BLUE: RGBA = [ 0, 0, 255, 0.5 ];

  describe('return value shape', () => {
    it('returns a Uint8ClampedArray', () => {
      const result = getPatternData('solid', BLACK, WHITE);
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('returns 256 bytes (64 pixels × 4 channels)', () => {
      const result = getPatternData('solid', BLACK, WHITE);
      expect(result).toHaveLength(256);
    });
  });

  describe('solid pattern', () => {
    it('fills every pixel with the pattern color', () => {
      const result = getPatternData('solid', RED, WHITE);
      for (let i = 0; i < 64; i++) {
        expect(result[i * 4 + 0]).toBe(255);
        expect(result[i * 4 + 1]).toBe(0);
        expect(result[i * 4 + 2]).toBe(0);
        expect(result[i * 4 + 3]).toBe(255);
      }
    });
  });

  describe('none pattern', () => {
    it('fills every pixel with the fill color', () => {
      const result = getPatternData('none', RED, WHITE);
      for (let i = 0; i < 64; i++) {
        expect(result[i * 4 + 0]).toBe(255);
        expect(result[i * 4 + 1]).toBe(255);
        expect(result[i * 4 + 2]).toBe(255);
        expect(result[i * 4 + 3]).toBe(255);
      }
    });
  });

  describe('pct50 pattern', () => {
    it('alternates between pattern and fill colors in a checkerboard', () => {
      const result = getPatternData('pct50', BLACK, WHITE);
      const pattern = '1010101001010101';
      for (let i = 0; i < 64; i++) {
        const bit = pattern[i % pattern.length];
        const expected = bit === '1' ? BLACK : WHITE;
        expect(result[i * 4 + 0]).toBe(expected[0]);
        expect(result[i * 4 + 1]).toBe(expected[1]);
        expect(result[i * 4 + 2]).toBe(expected[2]);
      }
    });
  });

  describe('alpha handling', () => {
    it('uses alpha from RGBA pattern color (scaled to 0-255)', () => {
      const result = getPatternData('solid', BLUE, WHITE);
      expect(result[3]).toBe(128);
    });

    it('defaults alpha to 255 when using RGB (no alpha channel)', () => {
      const rgb: RGB = [ 128, 64, 32 ];
      const result = getPatternData('solid', rgb, WHITE);
      expect(result[0]).toBe(128);
      expect(result[1]).toBe(64);
      expect(result[2]).toBe(32);
      expect(result[3]).toBe(255);
    });
  });

  describe('RGB tuples (no alpha)', () => {
    it('works with RGB for both pattern and fill colors', () => {
      const fg: RGB = [ 10, 20, 30 ];
      const bg: RGB = [ 200, 210, 220 ];
      const result = getPatternData('solid', fg, bg);
      // solid = all '1's → all pattern color
      expect(result[0]).toBe(10);
      expect(result[1]).toBe(20);
      expect(result[2]).toBe(30);
      expect(result[3]).toBe(255);
    });
  });

  describe('unknown pattern falls back to pct50', () => {
    it('uses pct50 when given an unrecognized pattern name', () => {
      const result = getPatternData('notARealPattern' as any, RED, WHITE);
      const expected = getPatternData('pct50', RED, WHITE);
      expect(result).toEqual(expected);
    });
  });

  describe('pattern tiling', () => {
    it('tiles short patterns across 64 pixels', () => {
      // narVert pattern = '10' (length 2), tiles: pixel 0 = '1', pixel 1 = '0', etc.
      const result = getPatternData('narVert', BLACK, WHITE);
      for (let i = 0; i < 64; i++) {
        const isPattern = i % 2 === 0;
        const expected = isPattern ? BLACK : WHITE;
        expect(result[i * 4 + 0]).toBe(expected[0]);
        expect(result[i * 4 + 1]).toBe(expected[1]);
        expect(result[i * 4 + 2]).toBe(expected[2]);
      }
    });
  });

  describe('specific pixel checks', () => {
    it('correctly maps first and last pixel of pct25', () => {
      // pct25 = '1000100000100010' (length 16)
      const result = getPatternData('pct25', RED, WHITE);
      // first pixel (i=0): pattern[0] = '1' → RED
      expect(result[0]).toBe(255);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(0);
      // second pixel (i=1): pattern[1] = '0' → WHITE
      expect(result[4]).toBe(255);
      expect(result[5]).toBe(255);
      expect(result[6]).toBe(255);
      // pixel 4 (i=4): pattern[4] = '1' → RED
      expect(result[16]).toBe(255);
      expect(result[17]).toBe(0);
      expect(result[18]).toBe(0);
    });
  });
});
