import { describe, it, expect } from 'vitest';
import { clamp } from './clamp.ts';

describe('clamp', () => {
  describe('value within range', () => {
    it('returns the value when it is between min and max', () => {
      expect(clamp(0, 5, 10)).toBe(5);
    });

    it('returns the value when it equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('returns the value when it equals max', () => {
      expect(clamp(0, 10, 10)).toBe(10);
    });
  });

  describe('value below min', () => {
    it('returns min when value is below min', () => {
      expect(clamp(0, -5, 10)).toBe(0);
    });

    it('returns min when value is far below min', () => {
      expect(clamp(0, -1000, 255)).toBe(0);
    });
  });

  describe('value above max', () => {
    it('returns max when value is above max', () => {
      expect(clamp(0, 20, 10)).toBe(10);
    });

    it('returns max when value is far above max', () => {
      expect(clamp(0, 9999, 255)).toBe(255);
    });
  });

  describe('negative ranges', () => {
    it('clamps within a fully negative range', () => {
      expect(clamp(-100, -50, -10)).toBe(-50);
    });

    it('clamps to negative min', () => {
      expect(clamp(-100, -200, -10)).toBe(-100);
    });

    it('clamps to negative max', () => {
      expect(clamp(-100, 0, -10)).toBe(-10);
    });
  });

  describe('fractional values', () => {
    it('returns fractional value within range', () => {
      expect(clamp(0, 0.5, 1)).toBe(0.5);
    });

    it('clamps fractional value to min', () => {
      expect(clamp(0, -0.1, 1)).toBe(0);
    });

    it('clamps fractional value to max', () => {
      expect(clamp(0, 1.1, 1)).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('works when min equals max and value matches', () => {
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('clamps to min when min equals max and value is below', () => {
      expect(clamp(5, 3, 5)).toBe(5);
    });

    it('clamps to max when min equals max and value is above', () => {
      expect(clamp(5, 7, 5)).toBe(5);
    });

    it('handles zero as all arguments', () => {
      expect(clamp(0, 0, 0)).toBe(0);
    });
  });
});
