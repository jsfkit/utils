import { describe, it, expect } from 'vitest';
import { pxToEmu } from './pxToEmu.ts';

describe('pxToEmu', () => {
  it('converts 0 px to 0 EMU', () => {
    expect(pxToEmu(0)).toBe(0);
  });

  it('converts 1 px to 12700 EMU', () => {
    expect(pxToEmu(1)).toBe(12700);
  });

  it('converts 2 px to 25400 EMU', () => {
    expect(pxToEmu(2)).toBe(25400);
  });

  it('converts 72 px to 914400 EMU (one inch at 72 DPI)', () => {
    expect(pxToEmu(72)).toBe(914400);
  });

  it('converts fractional pixels', () => {
    expect(pxToEmu(0.5)).toBe(6350);
  });

  it('converts 1.5 px to 19050 EMU', () => {
    expect(pxToEmu(1.5)).toBe(19050);
  });

  it('rounds the result to the nearest integer', () => {
    expect(pxToEmu(0.12345)).toBe(1568);
  });

  it('converts negative pixel values', () => {
    expect(pxToEmu(-1)).toBe(-12700);
  });

  it('converts large pixel values', () => {
    expect(pxToEmu(720)).toBe(9144000);
  });
});
