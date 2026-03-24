import { describe, it, expect } from 'vitest';
import { hslToRgb } from './hslToRgb.ts';

describe('hslToRgb', () => {
  describe('primary colors', () => {
    it('converts red (0, 1, 0.5) to [255, 0, 0, 1]', () => {
      const result = hslToRgb(0, 1, 0.5);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('converts green (120, 1, 0.5) to [0, 255, 0, 1]', () => {
      const result = hslToRgb(120, 1, 0.5);
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });

    it('converts blue (240, 1, 0.5) to [0, 0, 255, 1]', () => {
      const result = hslToRgb(240, 1, 0.5);
      expect(result).toEqual([ 0, 0, 255, 1 ]);
    });
  });

  describe('secondary colors', () => {
    it('converts yellow (60, 1, 0.5) to [255, 255, 0, 1]', () => {
      const result = hslToRgb(60, 1, 0.5);
      expect(result).toEqual([ 255, 255, 0, 1 ]);
    });

    it('converts cyan (180, 1, 0.5) to [0, 255, 255, 1]', () => {
      const result = hslToRgb(180, 1, 0.5);
      expect(result).toEqual([ 0, 255, 255, 1 ]);
    });

    it('converts magenta (300, 1, 0.5) to [255, 0, 255, 1]', () => {
      const result = hslToRgb(300, 1, 0.5);
      expect(result).toEqual([ 255, 0, 255, 1 ]);
    });
  });

  describe('achromatic colors (saturation = 0)', () => {
    it('converts black (0, 0, 0) to [0, 0, 0, 1]', () => {
      const result = hslToRgb(0, 0, 0);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('converts white (0, 0, 1) to [255, 255, 255, 1]', () => {
      const result = hslToRgb(0, 0, 1);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('converts 50% gray (0, 0, 0.5) to [127.5, 127.5, 127.5, 1]', () => {
      const result = hslToRgb(0, 0, 0.5);
      expect(result).toEqual([ 127.5, 127.5, 127.5, 1 ]);
    });
  });

  describe('NaN hue (achromatic)', () => {
    it('treats NaN hue with saturation 0 as achromatic', () => {
      const result = hslToRgb(NaN, 0, 0.5);
      expect(result).toEqual([ 127.5, 127.5, 127.5, 1 ]);
    });
  });

  describe('NaN saturation', () => {
    it('treats NaN saturation as 0 (achromatic)', () => {
      const result = hslToRgb(0, NaN, 0.5);
      expect(result).toEqual([ 127.5, 127.5, 127.5, 1 ]);
    });
  });

  describe('alpha parameter', () => {
    it('defaults alpha to 1 when not provided', () => {
      const result = hslToRgb(0, 1, 0.5);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('passes through custom alpha of 0.5', () => {
      const result = hslToRgb(0, 1, 0.5, 0.5);
      expect(result).toEqual([ 255, 0, 0, 0.5 ]);
    });

    it('passes through alpha of 0', () => {
      const result = hslToRgb(0, 1, 0.5, 0);
      expect(result).toEqual([ 255, 0, 0, 0 ]);
    });
  });

  describe('negative hue', () => {
    it('wraps -60 to equivalent of 300 (magenta)', () => {
      const result = hslToRgb(-60, 1, 0.5);
      expect(result).toEqual([ 255, 0, 255, 1 ]);
    });
  });

  describe('hue > 360', () => {
    it('wraps 480 to equivalent of 120 (green)', () => {
      const result = hslToRgb(480, 1, 0.5);
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });
  });

  describe('lightness extremes', () => {
    it('produces black when lum = 0 regardless of hue and saturation', () => {
      const result = hslToRgb(180, 1, 0);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('produces white when lum = 1 regardless of hue and saturation', () => {
      const result = hslToRgb(180, 1, 1);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  describe('lightness branching (l < 0.5 vs l >= 0.5)', () => {
    it('handles a dark color with l = 0.25 (m2 = lum + lum * s)', () => {
      const result = hslToRgb(0, 1, 0.25);
      expect(result).toEqual([ 127.5, 0, 0, 1 ]);
    });

    it('handles a light color with l = 0.75 (m2 = lum + (1-lum) * s)', () => {
      const result = hslToRgb(0, 1, 0.75);
      expect(result).toEqual([ 255, 127.5, 127.5, 1 ]);
    });
  });

  describe('arbitrary known conversions', () => {
    it('converts (210, 0.5, 0.4) to steel blue', () => {
      const result = hslToRgb(210, 0.5, 0.4);
      expect(result.map(Math.round)).toEqual([ 51, 102, 153, 1 ]);
    });

    it('converts (30, 1, 0.5) to [255, 127.5, 0, 1] (orange)', () => {
      const result = hslToRgb(30, 1, 0.5);
      expect(result).toEqual([ 255, 127.5, 0, 1 ]);
    });
  });
});
