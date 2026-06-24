import { describe, it, expect } from 'vitest';
import { mkTheme } from './mkTheme.ts';

describe('mkTheme', () => {
  it('sets the theme name to "Office Theme"', () => {
    const result = mkTheme([], 'Arial', 'Verdana');
    expect(result.name).toBe('Office Theme');
  });

  it('passes the palette through to colorScheme', () => {
    const pal = [ 'FF0000', '00FF00', '0000FF', 'AABBCC', '123ABC', 'DDEEFF', '112233', '445566', '778899', 'ABCDEF' ];
    const result = mkTheme(pal, 'Arial', 'Verdana');
    expect(result.colorScheme.dk2).toEqual({ type: 'srgb', value: 'FF0000' });
    expect(result.colorScheme.accent1).toEqual({ type: 'srgb', value: '0000FF' });
    expect(result.colorScheme.folHlink).toEqual({ type: 'srgb', value: 'ABCDEF' });
  });

  it('builds the font scheme with the given typefaces', () => {
    const result = mkTheme([], 'Calibri Light', 'Calibri');
    expect(result.fontScheme).toEqual({
      name: 'Office',
      major: { latin: { typeface: 'Calibri Light' } },
      minor: { latin: { typeface: 'Calibri' } },
    });
  });

  it('uses different font names when provided', () => {
    const result = mkTheme([], 'Georgia', 'Comic Sans MS');
    expect(result.fontScheme.major.latin).toEqual({ typeface: 'Georgia' });
    expect(result.fontScheme.minor.latin).toEqual({ typeface: 'Comic Sans MS' });
  });
});
