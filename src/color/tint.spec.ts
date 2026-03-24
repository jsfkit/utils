import { describe, it, expect } from 'vitest';
import { tint } from './tint.ts';

const round = (n: number) => Math.round(n * 1000) / 1000;

describe('tint', () => {
  describe('amount = 0 (no change)', () => {
    it('returns the original RGB unchanged for black', () => {
      const result = tint(0, 0, 0, 0);
      expect(result).toEqual([ 0, 0, 0 ]);
    });

    it('returns the original RGB unchanged for white', () => {
      const result = tint(255, 255, 255, 0);
      expect(result).toEqual([ 255, 255, 255 ]);
    });

    it('returns the original RGB unchanged for an arbitrary color', () => {
      const result = tint(100, 150, 200, 0);
      expect(result).toEqual([ 100, 150, 200 ]);
    });

    it('returns a 3-element tuple (no alpha) when amount is 0', () => {
      const result = tint(128, 64, 32, 0);
      expect(result).toEqual([ 128, 64, 32 ]);
    });
  });

  describe('lighten (amount > 0)', () => {
    it('returns white when amount is 1', () => {
      const result = tint(100, 50, 25, 1);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('returns white when lightening black fully', () => {
      const result = tint(0, 0, 0, 1);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('lightens a color at 50%', () => {
      const result = tint(255, 0, 0, 0.5);
      expect(result).toEqual([ 255, 127.5, 127.5, 1 ]);
    });

    it('lightens a mid-gray', () => {
      const result = tint(128, 128, 128, 0.5);
      expect(result).toEqual([ 191.5, 191.5, 191.5, 1 ]);
    });

    it('white stays white when lightened', () => {
      const result = tint(255, 255, 255, 0.5);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('a small lighten amount barely changes the color', () => {
      const result = tint(100, 50, 25, 0.01);
      expect(result.map(round)).toEqual([ 103.08, 51.54, 25.77, 1 ]);
    });

    it('returns a 4-element tuple when amount is non-zero', () => {
      const result = tint(128, 64, 32, 0.5);
      expect(result.map(round)).toEqual([ 220, 150, 115, 1 ]);
    });
  });

  describe('darken (amount < 0)', () => {
    it('returns black when amount is -1', () => {
      const result = tint(100, 200, 50, -1);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('returns black when darkening white fully', () => {
      const result = tint(255, 255, 255, -1);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('darkens a color at -50%', () => {
      const result = tint(255, 0, 0, -0.5);
      expect(result).toEqual([ 127.5, 0, 0, 1 ]);
    });

    it('darkens a mid-gray', () => {
      const result = tint(128, 128, 128, -0.5);
      expect(result).toEqual([ 64, 64, 64, 1 ]);
    });

    it('black stays black when darkened', () => {
      const result = tint(0, 0, 0, -0.5);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('a small darken amount barely changes the color', () => {
      const result = tint(100, 50, 25, -0.01);
      expect(result.map(round)).toEqual([ 99, 49.5, 24.75, 1 ]);
    });
  });

  describe('symmetry and consistency', () => {
    it('lighten and darken move in opposite directions', () => {
      const lighter = tint(128, 64, 32, 0.3);
      expect(lighter.map(round)).toEqual([ 206, 108, 59, 1 ]);

      const darker = tint(128, 64, 32, -0.3);
      expect(darker).toEqual([ 89.6, 44.8, 22.4, 1 ]);
    });

    it('increasing lighten amount produces progressively lighter colors', () => {
      const light25 = tint(100, 50, 25, 0.25);
      expect(light25.map(round)).toEqual([ 177, 88.5, 44.25, 1 ]);

      const light50 = tint(100, 50, 25, 0.5);
      expect(light50.map(round)).toEqual([ 216.5, 139.5, 101, 1 ]);

      const light75 = tint(100, 50, 25, 0.75);
      expect(light75.map(round)).toEqual([ 235.75, 197.25, 178, 1 ]);
    });

    it('increasing darken amount produces progressively darker colors', () => {
      const dark25 = tint(200, 150, 100, -0.25);
      expect(dark25.map(round)).toEqual([ 166.071, 112.5, 58.929, 1 ]);

      const dark50 = tint(200, 150, 100, -0.5);
      expect(dark50.map(round)).toEqual([ 110.714, 75, 39.286, 1 ]);

      const dark75 = tint(200, 150, 100, -0.75);
      expect(dark75.map(round)).toEqual([ 55.357, 37.5, 19.643, 1 ]);
    });
  });

  describe('preserves hue', () => {
    it('keeps hue intact when lightening pure green', () => {
      const result = tint(0, 255, 0, 0.3);
      expect(result.map(round)).toEqual([ 76.5, 255, 76.5, 1 ]);
    });

    it('keeps hue intact when darkening pure blue', () => {
      const result = tint(0, 0, 255, -0.3);
      expect(result).toEqual([ 0, 0, 178.5, 1 ]);
    });
  });
});
