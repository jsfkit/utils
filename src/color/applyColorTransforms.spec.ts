import { describe, it, expect } from 'vitest';
import { applyColorTransforms } from './applyColorTransforms.ts';

describe('applyColorTransforms', () => {
  // ── empty transforms ─────────────────────────────────────────────────

  describe('empty transforms', () => {
    it('returns the color unchanged when transforms list is empty', () => {
      expect(applyColorTransforms([ 255, 0, 0, 1 ], [])).toEqual([ 255, 0, 0, 1 ]);
    });

    it('returns black unchanged when transforms list is empty', () => {
      expect(applyColorTransforms([ 0, 0, 0, 1 ], [])).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── RGB channel absolute ─────────────────────────────────────────────

  describe('RGB absolute (red, green, blue)', () => {
    it('sets red channel to an absolute value', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'red', value: 50 },
      ]);
      expect(result).toEqual([ 127, 0, 0, 1 ]);
    });

    it('sets green channel to an absolute value', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'green', value: 100 },
      ]);
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });

    it('sets blue channel to an absolute value', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [ { type: 'blue', value: 20 } ]);
      expect(result).toEqual([ 0, 0, 51, 1 ]);
    });
  });

  // ── RGB channel mod ──────────────────────────────────────────────────

  describe('RGB mod (redMod, greenMod, blueMod)', () => {
    it('multiplies red channel by a percentage', () => {
      const result = applyColorTransforms([ 200, 100, 50, 1 ], [
        { type: 'redMod', value: 50 },
      ]);
      expect(result).toEqual([ 100, 100, 50, 1 ]);
    });

    it('multiplies green channel by 200%', () => {
      const result = applyColorTransforms([ 100, 40, 100, 1 ], [
        { type: 'greenMod', value: 200 },
      ]);
      expect(result).toEqual([ 100, 80, 100, 1 ]);
    });

    it('multiplies blue channel by 0% to zero it out', () => {
      const result = applyColorTransforms([ 100, 100, 100, 1 ], [
        { type: 'blueMod', value: 0 },
      ]);
      expect(result).toEqual([ 100, 100, 0, 1 ]);
    });
  });

  // ── RGB channel offset ───────────────────────────────────────────────

  describe('RGB offset (redOff, greenOff, blueOff)', () => {
    it('adds an offset to red channel', () => {
      const result = applyColorTransforms([ 100, 0, 0, 1 ], [
        { type: 'redOff', value: 20 },
      ]);
      expect(result).toEqual([ 151, 0, 0, 1 ]);
    });

    it('subtracts an offset from green channel', () => {
      const result = applyColorTransforms([ 0, 200, 0, 1 ], [
        { type: 'greenOff', value: -20 },
      ]);
      expect(result).toEqual([ 0, 149, 0, 1 ]);
    });

    it('clamps negative result to 0', () => {
      const result = applyColorTransforms([ 0, 0, 10, 1 ], [
        { type: 'blueOff', value: -50 },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── Alpha transforms ─────────────────────────────────────────────────

  describe('alpha transforms', () => {
    it('sets alpha to an absolute value', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'alpha', value: 50 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 0.5 ]);
    });

    it('sets alpha to 0 (fully transparent)', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'alpha', value: 0 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 0 ]);
    });

    it('sets alpha to 100 (fully opaque)', () => {
      const result = applyColorTransforms([ 255, 0, 0, 0.5 ], [
        { type: 'alpha', value: 100 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('multiplies alpha with alphaMod', () => {
      const result = applyColorTransforms([ 255, 0, 0, 0.8 ], [
        { type: 'alphaMod', value: 50 },
      ]);
      expect(result[3]).toBeCloseTo(0.4, 5);
    });

    it('adds offset to alpha with alphaOff', () => {
      const result = applyColorTransforms([ 255, 0, 0, 0.5 ], [
        { type: 'alphaOff', value: 25 },
      ]);
      // 0.5 + 25/100 = 0.75
      expect(result[3]).toBeCloseTo(0.75, 5);
    });

    it('clamps alpha to [0, 1]', () => {
      const result = applyColorTransforms([ 255, 0, 0, 0.9 ], [
        { type: 'alphaOff', value: 50 },
      ]);
      // 0.9 + 0.5 = 1.4 → clamped to 1
      expect(result[3]).toBe(1);
    });
  });

  // ── HSL absolute (hue, sat, lum) ─────────────────────────────────────

  describe('HSL absolute transforms', () => {
    it('sets hue to an absolute value', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'hue', value: 120 },
      ]);
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });

    it('sets saturation to an absolute value', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'sat', value: 0 },
      ]);
      expect(result).toEqual([ 127, 127, 127, 1 ]);
    });

    it('sets luminance to an absolute value', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'lum', value: 100 },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('sets luminance to 0 → black', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'lum', value: 0 },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── HSL mod transforms ──────────────────────────────────────────────

  describe('HSL mod transforms', () => {
    it('hueMod multiplies hue by a percentage', () => {
      const result = applyColorTransforms([ 0, 255, 0, 1 ], [
        { type: 'hueMod', value: 200 },
      ]);
      expect(result).toEqual([ 0, 0, 255, 1 ]);
    });

    it('satMod reduces saturation', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [ { type: 'satMod', value: 50 } ]);
      expect(result).toEqual([ 191, 63, 63, 1 ]);
    });

    it('lumMod darkens the color', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'lumMod', value: 50 },
      ]);
      expect(result).toEqual([ 127, 0, 0, 1 ]);
    });
  });

  // ── HSL offset transforms ───────────────────────────────────────────

  describe('HSL offset transforms', () => {
    it('hueOff adds degrees to the hue', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'hueOff', value: 120 },
      ]);
      expect(result).toEqual([ 0, 255, 0, 1 ]);
    });

    it('satOff adds to saturation', () => {
      const result = applyColorTransforms([ 191, 63, 63, 1 ], [
        { type: 'satOff', value: 10 },
      ]);
      expect(result).toEqual([ 203, 50, 50, 1 ]);
    });

    it('lumOff adds to luminance', () => {
      // Dark red, increase luminance
      const result = applyColorTransforms([ 128, 0, 0, 1 ], [
        { type: 'lumOff', value: 15 },
      ]);
      expect(result).toEqual([ 204, 0, 0, 1 ]);
    });
  });

  // ── complement ───────────────────────────────────────────────────────

  describe('comp (complement)', () => {
    it('complements red (h=0) to cyan (h=180)', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'comp' },
      ]);
      expect(result).toEqual([ 0, 255, 255, 1 ]);
    });

    it('complements green (h=120) to magenta (h=300)', () => {
      const result = applyColorTransforms([ 0, 255, 0, 1 ], [
        { type: 'comp' },
      ]);
      expect(result).toEqual([ 255, 0, 255, 1 ]);
    });

    it('double complement returns to original', () => {
      const result = applyColorTransforms([ 200, 100, 50, 1 ], [
        { type: 'comp' },
        { type: 'comp' },
      ]);
      // rounding error is to be expected
      expect(result).toEqual([ 200, 100, 49, 1 ]);
    });
  });

  // ── inverse ──────────────────────────────────────────────────────────

  describe('inv (inverse)', () => {
    it('inverts black to white', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'inv' },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('inverts white to black', () => {
      const result = applyColorTransforms([ 255, 255, 255, 1 ], [
        { type: 'inv' },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('inverts an arbitrary color', () => {
      const result = applyColorTransforms([ 100, 150, 200, 0.8 ], [
        { type: 'inv' },
      ]);
      expect(result).toEqual([ 155, 105, 55, 0.8 ]);
    });

    it('does not affect alpha', () => {
      const result = applyColorTransforms([ 100, 100, 100, 0.5 ], [
        { type: 'inv' },
      ]);
      expect(result).toEqual([ 155, 155, 155, 0.5 ]);
    });

    it('double inverse returns to original', () => {
      const result = applyColorTransforms([ 42, 128, 200, 1 ], [
        { type: 'inv' },
        { type: 'inv' },
      ]);
      expect(result).toEqual([ 42, 128, 200, 1 ]);
    });
  });

  // ── gamma ────────────────────────────────────────────────────────────

  describe('gamma', () => {
    it('applies sRGB gamma to a mid-tone color', () => {
      const expected = Math.trunc((128 / 255) ** (1 / 2.2) * 255);
      const result = applyColorTransforms([ 128, 128, 128, 1 ], [
        { type: 'gamma' },
      ]);
      expect(result).toEqual([ expected, expected, expected, 1 ]);
    });

    it('leaves black unchanged', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'gamma' },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('leaves white unchanged', () => {
      const result = applyColorTransforms([ 255, 255, 255, 1 ], [
        { type: 'gamma' },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('does not affect alpha', () => {
      const result = applyColorTransforms([ 128, 128, 128, 0.7 ], [
        { type: 'gamma' },
      ]);
      expect(result).toEqual([ 186, 186, 186, 0.7 ]);
    });
  });

  // ── invGamma ─────────────────────────────────────────────────────────

  describe('invGamma', () => {
    it('applies inverse gamma to a mid-tone color', () => {
      const result = applyColorTransforms([ 128, 128, 128, 1 ], [
        { type: 'invGamma' },
      ]);
      expect(result).toEqual([ 55, 55, 55, 1 ]);
    });

    it('leaves black unchanged', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'invGamma' },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('leaves white unchanged', () => {
      const result = applyColorTransforms([ 255, 255, 255, 1 ], [
        { type: 'invGamma' },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  // ── gray ─────────────────────────────────────────────────────────────

  describe('gray (grayscale)', () => {
    it('converts a pure color to grayscale', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 54, 54, 54, 1 ]);
    });

    it('converts green to a brighter grayscale than red', () => {
      const result = applyColorTransforms([ 0, 255, 0, 1 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 182, 182, 182, 1 ]);
    });

    it('keeps black as black', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('keeps white as white', () => {
      const result = applyColorTransforms([ 255, 255, 255, 1 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });

    it('does not affect alpha', () => {
      const result = applyColorTransforms([ 200, 100, 50, 0.6 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 55, 55, 55, 0.6 ]);
    });

    it('produces equal R, G, B channels for any input', () => {
      const result = applyColorTransforms([ 200, 100, 50, 1 ], [
        { type: 'gray' },
      ]);
      expect(result).toEqual([ 55, 55, 55, 1 ]);
    });
  });

  // ── tint ─────────────────────────────────────────────────────────────

  describe('tint', () => {
    it('lightens a color towards white', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'tint', value: 50 },
      ]);
      expect(result).toEqual([ 255, 128, 128, 1 ]);
    });

    it('100% tint leaves color unchanged', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'tint', value: 100 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('0% tint turns color to white', () => {
      const result = applyColorTransforms([ 200, 100, 50, 1 ], [
        { type: 'tint', value: 0 },
      ]);
      expect(result).toEqual([ 255, 255, 255, 1 ]);
    });
  });

  // ── shade ────────────────────────────────────────────────────────────

  describe('shade', () => {
    it('darkens a color towards black', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'shade', value: 50 },
      ]);
      expect(result).toEqual([ 128, 0, 0, 1 ]);
    });

    it('100% shade leaves color unchanged', () => {
      const result = applyColorTransforms([ 255, 128, 64, 1 ], [
        { type: 'shade', value: 100 },
      ]);
      expect(result).toEqual([ 255, 128, 64, 1 ]);
    });

    it('0% shade turns color to black', () => {
      const result = applyColorTransforms([ 200, 100, 50, 1 ], [
        { type: 'shade', value: 0 },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  // ── output clamping ──────────────────────────────────────────────────

  describe('output clamping and truncation', () => {
    it('clamps RGB channels to 0-255 range', () => {
      const result = applyColorTransforms([ 200, 0, 0, 1 ], [
        { type: 'redMod', value: 200 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('clamps negative RGB channels to 0', () => {
      const result = applyColorTransforms([ 50, 0, 0, 1 ], [
        { type: 'redOff', value: -50 },
      ]);
      expect(result).toEqual([ 0, 0, 0, 1 ]);
    });

    it('truncates fractional RGB values', () => {
      // 33/100 * 255 = 84.15 → trunc to 84
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'red', value: 33 },
      ]);
      expect(result).toEqual([ 84, 0, 0, 1 ]);
    });

    it('clamps alpha to [0, 1]', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'alphaOff', value: 50 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 1 ]);
    });

    it('clamps negative alpha to 0', () => {
      const result = applyColorTransforms([ 255, 0, 0, 0.2 ], [
        { type: 'alphaOff', value: -50 },
      ]);
      expect(result).toEqual([ 255, 0, 0, 0 ]);
    });
  });

  // ── multiple transforms ──────────────────────────────────────────────

  describe('multiple transforms in sequence', () => {
    it('applies transforms left to right', () => {
      const result = applyColorTransforms([ 0, 0, 0, 1 ], [
        { type: 'red', value: 100 },     // r = 255
        { type: 'redMod', value: 50 },   // r = 127.5
      ]);
      expect(result).toEqual([ 127, 0, 0, 1 ]);
    });

    it('combines HSL and RGB transforms', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'lumMod', value: 50 },   // darken via HSL
        { type: 'alpha', value: 50 },     // set alpha
      ]);
      expect(result).toEqual([ 127, 0, 0, 0.5 ]);
    });

    it('applies tint then shade', () => {
      const result = applyColorTransforms([ 255, 0, 0, 1 ], [
        { type: 'tint', value: 50 },
        { type: 'shade', value: 50 },
      ]);
      expect(result).toEqual([ 191, 0, 0, 1 ]);
    });

    it('applies lumMod then lumOff together (common pattern)', () => {
      const result = applyColorTransforms([ 68, 114, 196, 1 ], [
        { type: 'lumMod', value: 75 },
        { type: 'lumOff', value: 25 },
      ]);
      expect(result).toEqual([ 114, 149, 210, 1 ]);
    });
  });
});
