import { describe, it, expect } from 'vitest';
import { mkColorScheme } from './mkColorScheme.ts';

describe('mkColorScheme', () => {
  const PAL = [
    'FF0000',
    '00FF00',
    '0000FF',
    'AABBCC',
    '123ABC',
    'DDEEFF',
    '112233',
    '445566',
    '778899',
    'ABCDEF',
  ];

  describe('with a full palette', () => {
    it('maps palette entries to the correct scheme slots', () => {
      const result = mkColorScheme(PAL);
      expect(result.dk2).toEqual({ type: 'srgb', value: 'FF0000' });
      expect(result.lt2).toEqual({ type: 'srgb', value: '00FF00' });
      expect(result.accent1).toEqual({ type: 'srgb', value: '0000FF' });
      expect(result.accent2).toEqual({ type: 'srgb', value: 'AABBCC' });
      expect(result.accent3).toEqual({ type: 'srgb', value: '123ABC' });
      expect(result.accent4).toEqual({ type: 'srgb', value: 'DDEEFF' });
      expect(result.accent5).toEqual({ type: 'srgb', value: '112233' });
      expect(result.accent6).toEqual({ type: 'srgb', value: '445566' });
      expect(result.hlink).toEqual({ type: 'srgb', value: '778899' });
      expect(result.folHlink).toEqual({ type: 'srgb', value: 'ABCDEF' });
    });

    it('always sets dk1 as system windowText', () => {
      const result = mkColorScheme(PAL);
      expect(result.dk1).toEqual({ type: 'system', value: 'windowText' });
    });

    it('always sets lt1 as system window', () => {
      const result = mkColorScheme(PAL);
      expect(result.lt1).toEqual({ type: 'system', value: 'window' });
    });
  });

  describe('name parameter', () => {
    it('defaults name to "Office"', () => {
      const result = mkColorScheme(PAL);
      expect(result.name).toBe('Office');
    });

    it('uses a custom name when provided', () => {
      const result = mkColorScheme(PAL, 'My Custom Theme');
      expect(result.name).toBe('My Custom Theme');
    });
  });

  describe('defaults (empty palette)', () => {
    it('uses default values when palette is empty', () => {
      const result = mkColorScheme([]);
      expect(result.dk2).toEqual({ type: 'srgb', value: '0E2841' });
      expect(result.lt2).toEqual({ type: 'srgb', value: 'E8E8E8' });
      expect(result.accent1).toEqual({ type: 'srgb', value: '156082' });
      expect(result.accent2).toEqual({ type: 'srgb', value: 'E97132' });
      expect(result.accent3).toEqual({ type: 'srgb', value: '196B24' });
      expect(result.accent4).toEqual({ type: 'srgb', value: '0F9ED5' });
      expect(result.accent5).toEqual({ type: 'srgb', value: 'A02B93' });
      expect(result.accent6).toEqual({ type: 'srgb', value: '4EA72E' });
      expect(result.hlink).toEqual({ type: 'srgb', value: '467886' });
      expect(result.folHlink).toEqual({ type: 'srgb', value: '96607D' });
    });

    it('uses default values when called with no arguments', () => {
      const result = mkColorScheme();
      expect(result.name).toBe('Office');
      expect(result.dk2).toEqual({ type: 'srgb', value: '0E2841' });
      expect(result.accent1).toEqual({ type: 'srgb', value: '156082' });
    });
  });

  describe('partial palette', () => {
    it('uses provided values and falls back to defaults for missing entries', () => {
      const result = mkColorScheme([ 'AABB00', 'CC1122' ]);
      expect(result.dk2).toEqual({ type: 'srgb', value: 'AABB00' });
      expect(result.lt2).toEqual({ type: 'srgb', value: 'CC1122' });
      // rest fall back to defaults
      expect(result.accent1).toEqual({ type: 'srgb', value: '156082' });
      expect(result.accent2).toEqual({ type: 'srgb', value: 'E97132' });
      expect(result.accent3).toEqual({ type: 'srgb', value: '196B24' });
      expect(result.accent4).toEqual({ type: 'srgb', value: '0F9ED5' });
      expect(result.accent5).toEqual({ type: 'srgb', value: 'A02B93' });
      expect(result.accent6).toEqual({ type: 'srgb', value: '4EA72E' });
      expect(result.hlink).toEqual({ type: 'srgb', value: '467886' });
      expect(result.folHlink).toEqual({ type: 'srgb', value: '96607D' });
    });
  });

  describe('full snapshot', () => {
    it('returns the expected complete object', () => {
      const result = mkColorScheme(PAL, 'Test Theme');
      expect(result).toEqual({
        name: 'Test Theme',
        dk1: { type: 'system', value: 'windowText' },
        lt1: { type: 'system', value: 'window' },
        dk2: { type: 'srgb', value: 'FF0000' },
        lt2: { type: 'srgb', value: '00FF00' },
        accent1: { type: 'srgb', value: '0000FF' },
        accent2: { type: 'srgb', value: 'AABBCC' },
        accent3: { type: 'srgb', value: '123ABC' },
        accent4: { type: 'srgb', value: 'DDEEFF' },
        accent5: { type: 'srgb', value: '112233' },
        accent6: { type: 'srgb', value: '445566' },
        hlink: { type: 'srgb', value: '778899' },
        folHlink: { type: 'srgb', value: 'ABCDEF' },
      });
    });
  });
});
