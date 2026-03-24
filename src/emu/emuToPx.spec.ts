import { describe, it, expect } from 'vitest';
import { emuToPx } from './emuToPx.ts';

describe('emuToPx', () => {
  it('converts 0 EMU to 0 px', () => {
    expect(emuToPx(0)).toBe(0);
  });

  it('converts 12700 EMU to 1 px', () => {
    expect(emuToPx(12700)).toBe(1);
  });

  it('converts 25400 EMU to 2 px', () => {
    expect(emuToPx(25400)).toBe(2);
  });

  it('converts 914400 EMU to 72 px (one inch at 72 DPI)', () => {
    expect(emuToPx(914400)).toBe(72);
  });

  it('handles fractional pixel results', () => {
    // 6350 / 12700 = 0.5
    expect(emuToPx(6350)).toBe(0.5);
  });

  it('rounds to 5 decimal places to avoid floating point noise', () => {
    expect(emuToPx(1)).toBe(0.00008);
  });

  it('converts negative EMU values', () => {
    expect(emuToPx(-12700)).toBe(-1);
  });

  it('converts large EMU values', () => {
    expect(emuToPx(9144000)).toBe(720);
  });

  it('handles a non-round EMU value', () => {
    // 19050 / 12700 = 1.5
    expect(emuToPx(19050)).toBe(1.5);
  });
});
