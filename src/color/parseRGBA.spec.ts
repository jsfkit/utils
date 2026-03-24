import { describe, it, expect } from 'vitest';
import { parseRGBA } from './parseRGBA.ts';

describe('parseRGBA', () => {
  describe('falsy / missing input', () => {
    it('returns opaque black for undefined', () => {
      expect(parseRGBA(undefined)).toEqual([ 0, 0, 0, 1 ]);
    });

    it('returns opaque black for empty string', () => {
      expect(parseRGBA('')).toEqual([ 0, 0, 0, 1 ]);
    });
  });

  describe('6-digit hex colors', () => {
    it('parses black', () => {
      expect(parseRGBA('000000')).toEqual([ 0, 0, 0, 1 ]);
    });

    it('parses white', () => {
      expect(parseRGBA('FFFFFF')).toEqual([ 255, 255, 255, 1 ]);
    });

    it('parses pure red', () => {
      expect(parseRGBA('FF0000')).toEqual([ 255, 0, 0, 1 ]);
    });

    it('parses pure green', () => {
      expect(parseRGBA('00FF00')).toEqual([ 0, 255, 0, 1 ]);
    });

    it('parses pure blue', () => {
      expect(parseRGBA('0000FF')).toEqual([ 0, 0, 255, 1 ]);
    });

    it('parses an arbitrary color', () => {
      expect(parseRGBA('4472C4')).toEqual([ 68, 114, 196, 1 ]);
    });

    it('parses lowercase hex', () => {
      expect(parseRGBA('ff8c00')).toEqual([ 255, 140, 0, 1 ]);
    });
  });

  describe('6-digit hex with # prefix', () => {
    it('strips the # and parses correctly', () => {
      expect(parseRGBA('#FF0000')).toEqual([ 255, 0, 0, 1 ]);
    });

    it('handles lowercase with #', () => {
      expect(parseRGBA('#abcdef')).toEqual([ 171, 205, 239, 1 ]);
    });
  });

  describe('8-digit hex colors (RGBA)', () => {
    it('parses fully opaque black', () => {
      expect(parseRGBA('000000FF')).toEqual([ 0, 0, 0, 1 ]);
    });

    it('parses fully transparent black', () => {
      expect(parseRGBA('00000000')).toEqual([ 0, 0, 0, 0 ]);
    });

    it('parses white at half alpha', () => {
      // 0x80 = 128 → 128/255 ≈ 0.502
      expect(parseRGBA('FFFFFF80')).toEqual([ 255, 255, 255, 128 / 255 ]);
    });

    it('parses an arbitrary 8-digit color', () => {
      // ED7D31CC → R=237 G=125 B=49 A=204/255
      expect(parseRGBA('ED7D31CC')).toEqual([ 237, 125, 49, 204 / 255 ]);
    });

    it('handles # prefix with 8-digit hex', () => {
      expect(parseRGBA('#FF000080')).toEqual([ 255, 0, 0, 128 / 255 ]);
    });
  });

  describe('system colors', () => {
    it('resolves "window" to white', () => {
      // SYSTEM_COLORS.window = 'FFFFFF'
      expect(parseRGBA('window')).toEqual([ 255, 255, 255, 1 ]);
    });

    it('resolves "windowText" to black', () => {
      // SYSTEM_COLORS.windowText = '000000'
      expect(parseRGBA('windowText')).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves "highlight"', () => {
      // SYSTEM_COLORS.highlight = '0078D7'
      expect(parseRGBA('highlight')).toEqual([ 0, 120, 215, 1 ]);
    });

    it('resolves "btnFace"', () => {
      // SYSTEM_COLORS.btnFace = 'F0F0F0'
      expect(parseRGBA('btnFace')).toEqual([ 240, 240, 240, 1 ]);
    });
  });

  describe('preset colors', () => {
    it('resolves "red"', () => {
      // PRESET_COLORS.red = 'FF0000'
      expect(parseRGBA('red')).toEqual([ 255, 0, 0, 1 ]);
    });

    it('resolves "blue"', () => {
      expect(parseRGBA('blue')).toEqual([ 0, 0, 255, 1 ]);
    });

    it('resolves "black"', () => {
      expect(parseRGBA('black')).toEqual([ 0, 0, 0, 1 ]);
    });

    it('resolves "white"', () => {
      expect(parseRGBA('white')).toEqual([ 255, 255, 255, 1 ]);
    });

    it('resolves "coral"', () => {
      // PRESET_COLORS.coral = 'FF7F50'
      expect(parseRGBA('coral')).toEqual([ 255, 127, 80, 1 ]);
    });

    it('resolves "dkBlue" (dark blue)', () => {
      // PRESET_COLORS.dkBlue = '00008B'
      expect(parseRGBA('dkBlue')).toEqual([ 0, 0, 139, 1 ]);
    });

    it('resolves "ltGray" (light gray)', () => {
      // PRESET_COLORS.ltGray = 'D3D3D3'
      expect(parseRGBA('ltGray')).toEqual([ 211, 211, 211, 1 ]);
    });
  });

  describe('error handling', () => {
    it('throws for a 3-digit hex string', () => {
      expect(() => parseRGBA('FFF')).toThrow('Cannot parse color: FFF');
    });

    it('throws for a 4-digit hex string', () => {
      expect(() => parseRGBA('FFFF')).toThrow('Cannot parse color: FFFF');
    });

    it('throws for a random string', () => {
      expect(() => parseRGBA('notacolor')).toThrow('Cannot parse color: notacolor');
    });

    it('throws for a 7-digit string', () => {
      expect(() => parseRGBA('1234567')).toThrow('Cannot parse color: 1234567');
    });
  });
});
