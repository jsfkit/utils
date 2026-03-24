import { describe, it, expect } from 'vitest';
import { rgbToHsl } from './rgbToHsl.ts';

const round = (n: number) => Math.round(n * 1000) / 1000;

describe('rgbToHsl', () => {
  describe('achromatic colors (no saturation)', () => {
    it('converts black (0,0,0) to [NaN, NaN, 0]', () => {
      const result = rgbToHsl(0, 0, 0);
      expect(result).toEqual([ NaN, NaN, 0 ]);
    });

    it('converts white (255,255,255) to [NaN, NaN, 1]', () => {
      const result = rgbToHsl(255, 255, 255);
      expect(result).toEqual([ NaN, NaN, 1 ]);
    });

    it('converts mid gray (128,128,128) to [NaN, 0, ~0.502]', () => {
      const result = rgbToHsl(128, 128, 128);
      expect(result.map(round)).toEqual([ NaN, 0, 0.502 ]);
    });
  });

  describe('primary colors', () => {
    it('converts pure red (255,0,0) to [0, 1, 0.5]', () => {
      const result = rgbToHsl(255, 0, 0);
      expect(result).toEqual([ 0, 1, 0.5 ]);
    });

    it('converts pure green (0,255,0) to [120, 1, 0.5]', () => {
      const result = rgbToHsl(0, 255, 0);
      expect(result).toEqual([ 120, 1, 0.5 ]);
    });

    it('converts pure blue (0,0,255) to [240, 1, 0.5]', () => {
      const result = rgbToHsl(0, 0, 255);
      expect(result).toEqual([ 240, 1, 0.5 ]);
    });
  });

  describe('secondary colors', () => {
    it('converts yellow (255,255,0) to [60, 1, 0.5]', () => {
      const result = rgbToHsl(255, 255, 0);
      expect(result).toEqual([ 60, 1, 0.5 ]);
    });

    it('converts cyan (0,255,255) to [180, 1, 0.5]', () => {
      const result = rgbToHsl(0, 255, 255);
      expect(result).toEqual([ 180, 1, 0.5 ]);
    });

    it('converts magenta (255,0,255) to [300, 1, 0.5]', () => {
      const result = rgbToHsl(255, 0, 255);
      expect(result).toEqual([ 300, 1, 0.5 ]);
    });
  });

  describe('hue wrapping (red max with g < b triggers +6 path)', () => {
    it('converts (255, 0, 128) to hue near 330°', () => {
      const result = rgbToHsl(255, 0, 128);
      expect(result.map(round)).toEqual([ 329.882, 1, 0.5 ]);
    });

    it('converts (255, 0, 1) to hue near 360° (just under)', () => {
      const result = rgbToHsl(255, 0, 1);
      expect(result.map(round)).toEqual([ 359.765, 1, 0.5 ]);
    });
  });

  describe('arbitrary known conversions', () => {
    it('converts (51, 102, 153) to [210, 0.5, 0.4]', () => {
      const result = rgbToHsl(51, 102, 153);
      expect(result.map(round)).toEqual([ 210, 0.5, 0.4 ]);
    });

    it('converts (192, 64, 0) to [20, 1, ~0.376]', () => {
      const result = rgbToHsl(192, 64, 0);
      expect(result.map(round)).toEqual([ 20, 1, 0.376 ]);
    });

    it('converts (100, 200, 150) to [150, ~0.476, ~0.588]', () => {
      const result = rgbToHsl(100, 200, 150);
      expect(result.map(round)).toEqual([ 150, 0.476, 0.588 ]);
    });

    it('converts (64, 0, 128) to [270, 1, ~0.251]', () => {
      const result = rgbToHsl(64, 0, 128);
      expect(result.map(round)).toEqual([ 270, 1, 0.251 ]);
    });
  });

  describe('lightness branching (l < 0.5 vs l >= 0.5)', () => {
    it('handles a dark color (l < 0.5) correctly', () => {
      const result = rgbToHsl(50, 20, 10);
      expect(result.map(round)).toEqual([ 15, 0.667, 0.118 ]);
    });

    it('handles a light color (l >= 0.5) correctly', () => {
      const result = rgbToHsl(200, 220, 180);
      expect(result.map(round)).toEqual([ 90, 0.364, 0.784 ]);
    });
  });
});
