import { describe, it, expect } from 'vitest';
import { tint } from './tint.ts';

// `tint` applies a spreadsheet theme tint via Excel's integer Win32-HLS round-trip (see
// win32Hls.spec.ts for the Excel ground-truth samples). Results are therefore integer RGB
// channels, and the round-trip is intentionally lossy in the same way Excel is.

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
      expect(result).toEqual([ 255, 128, 128, 1 ]);
    });

    it('lightens a mid-gray', () => {
      const result = tint(128, 128, 128, 0.5);
      expect(result).toEqual([ 191, 191, 191, 1 ]);
    });

    it('white stays white when lightened', () => {
      const result = tint(255, 255, 255, 0.5);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('a small lighten amount barely changes the color', () => {
      const result = tint(100, 50, 25, 0.01);
      expect(result).toEqual([ 102, 50, 26, 1 ]);
    });

    it('returns a 4-element tuple when amount is non-zero', () => {
      const result = tint(128, 64, 32, 0.5);
      expect(result).toEqual([ 220, 149, 114, 1 ]);
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
      expect(result).toEqual([ 128, 0, 0, 1 ]);
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
      expect(result).toEqual([ 99, 49, 24, 1 ]);
    });
  });

  describe('symmetry and consistency', () => {
    it('lighten and darken move in opposite directions', () => {
      const lighter = tint(128, 64, 32, 0.3);
      expect(lighter).toEqual([ 206, 106, 57, 1 ]);

      const darker = tint(128, 64, 32, -0.3);
      expect(darker).toEqual([ 88, 44, 22, 1 ]);
    });

    it('increasing lighten amount produces progressively lighter colors', () => {
      const light25 = tint(100, 50, 25, 0.25);
      expect(light25).toEqual([ 176, 87, 45, 1 ]);

      const light50 = tint(100, 50, 25, 0.5);
      expect(light50).toEqual([ 217, 138, 100, 1 ]);

      const light75 = tint(100, 50, 25, 0.75);
      expect(light75).toEqual([ 236, 196, 176, 1 ]);
    });

    it('increasing darken amount produces progressively darker colors', () => {
      const dark25 = tint(200, 150, 100, -0.25);
      expect(dark25).toEqual([ 165, 112, 58, 1 ]);

      const dark50 = tint(200, 150, 100, -0.5);
      expect(dark50).toEqual([ 109, 74, 39, 1 ]);

      const dark75 = tint(200, 150, 100, -0.75);
      expect(dark75).toEqual([ 55, 37, 19, 1 ]);
    });
  });

  describe('preserves hue', () => {
    it('keeps hue intact when lightening pure green', () => {
      const result = tint(0, 255, 0, 0.3);
      expect(result).toEqual([ 77, 255, 77, 1 ]);
    });

    it('keeps hue intact when darkening pure blue', () => {
      const result = tint(0, 0, 255, -0.3);
      expect(result).toEqual([ 0, 0, 179, 1 ]);
    });
  });
});
