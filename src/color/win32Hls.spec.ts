import { describe, it, expect } from 'vitest';
import { tintHls } from './win32Hls.ts';
import type { RGB } from './types.ts';

const hexToRgb = (hex: string): RGB => [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16),
];
const rgbToHex = (rgb: RGB): string => rgb.map(c => Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0').toUpperCase()).join('');

describe('tintHls', () => {
  it('returns the base unchanged for a zero tint', () => {
    expect(tintHls([ 0x15, 0x60, 0x82 ], 0)).toEqual([ 0x15, 0x60, 0x82 ]);
  });

  it('lightens fully to white at tint 1', () => {
    expect(tintHls([ 0x15, 0x60, 0x82 ], 1)).toEqual([ 255, 255, 255 ]);
  });

  it('darkens fully to black at tint -1', () => {
    expect(tintHls([ 0x15, 0x60, 0x82 ], -1)).toEqual([ 0, 0, 0 ]);
  });

  it('rounds fractional input channels before converting', () => {
    expect(tintHls([ 20.4, 96.6, 130.2 ], 0.5)).toEqual(tintHls([ 20, 97, 130 ], 0.5));
  });

  // Excel ground truth (Excel for Mac 16.111), read back from a workbook whose theme is the
  // current Office palette. Each row is [ base, theme tint, RGB Excel resolved ]. A representative
  // subset of 232 such samples read back from Excel (all 232 reproduce from this routine); these 64
  // span every theme slot, both lighten and darken, and the int16-coercion and achromatic-grey edge
  // cases that distinguish Excel's integer HLS round-trip from the float-HSL formula.
  describe('matches Excel for the integer-HLS round-trip', () => {
    const cases: Array<[ string, number, string ]> = [
      [ '156082', 0.7999816888943144, 'C0E6F5' ],
      [ '156082', 0.3999755851924192, '44B3E1' ],
      [ '156082', -0.499984740745262, '0B3040' ],
      [ '156082', 0.1, '1A779F' ],
      [ '156082', 0.25, '229ACE' ],
      [ '156082', -0.1, '135673' ],
      [ '156082', -0.55, '0A2B38' ],
      [ '156082', -0.9, '020A0D' ],
      [ 'E97132', 0.7999816888943144, 'FBE2D5' ],
      [ 'E97132', 0.3999755851924192, 'F1A983' ],
      [ 'E97132', -0.499984740745262, '7E350E' ],
      [ 'E97132', 0.1, 'EB8045' ],
      [ 'E97132', 0.25, 'EE9564' ],
      [ 'E97132', -0.1, 'E46018' ],
      [ 'E97132', -0.55, '71300D' ],
      [ 'E97132', -0.9, '180B03' ],
      [ '196B24', 0.7999816888943144, 'C1F0C8' ],
      [ '196B24', 0.3999755851924192, '47D359' ],
      [ '196B24', -0.499984740745262, '0D3512' ],
      [ '196B24', 0.1, '20882D' ],
      [ '196B24', 0.25, '2BB73D' ],
      [ '196B24', -0.1, '165F20' ],
      [ '196B24', -0.55, '0B2F0F' ],
      [ '196B24', -0.9, '020B03' ],
      [ '0F9ED5', 0.7999816888943144, 'CAEDFB' ],
      [ '0F9ED5', 0.3999755851924192, '61CBF3' ],
      [ '0F9ED5', -0.499984740745262, '074F69' ],
      [ '0F9ED5', 0.1, '11B1EE' ],
      [ '0F9ED5', 0.25, '38BEF1' ],
      [ '0F9ED5', -0.1, '0E8DBE' ],
      [ '0F9ED5', -0.55, '064760' ],
      [ '0F9ED5', -0.9, '010F14' ],
      [ 'A02B93', 0.7999816888943144, 'F2CEEF' ],
      [ 'A02B93', 0.3999755851924192, 'D86DCD' ],
      [ 'A02B93', -0.499984740745262, '51154A' ],
      [ 'A02B93', 0.1, 'B832AA' ],
      [ 'A02B93', 0.25, 'CE4AC1' ],
      [ 'A02B93', -0.1, '8F2785' ],
      [ 'A02B93', -0.55, '481343' ],
      [ 'A02B93', -0.9, '0F040E' ],
      [ '4EA72E', 0.7999816888943144, 'DAF2D0' ],
      [ '4EA72E', 0.3999755851924192, '8ED973' ],
      [ '4EA72E', -0.499984740745262, '275317' ],
      [ '4EA72E', 0.1, '5ABE34' ],
      [ '4EA72E', 0.25, '73CE51' ],
      [ '4EA72E', -0.1, '479629' ],
      [ '4EA72E', -0.55, '234B14' ],
      [ '4EA72E', -0.9, '071104' ],
      [ 'E8E8E8', 0.7999816888943144, 'FAFAFA' ],
      [ 'E8E8E8', 0.3999755851924192, 'F0F0F0' ],
      [ 'E8E8E8', -0.499984740745262, '747474' ],
      [ 'E8E8E8', 0.1, 'EAEAEA' ],
      [ 'E8E8E8', 0.25, 'EDEDED' ],
      [ 'E8E8E8', -0.1, 'D0D0D0' ],
      [ 'E8E8E8', -0.55, '686868' ],
      [ 'E8E8E8', -0.9, '161616' ],
      [ '0E2841', 0.7999816888943144, 'B8D3EF' ],
      [ '0E2841', 0.3999755851924192, '2D7DCE' ],
      [ '0E2841', -0.499984740745262, '061320' ],
      [ '0E2841', 0.1, '153D64' ],
      [ '0E2841', 0.25, '215C98' ],
      [ '0E2841', -0.1, '0D2339' ],
      [ '0E2841', -0.55, '06111C' ],
      [ '0E2841', -0.9, '010305' ],
    ];
    for (const [ base, tint, expected ] of cases) {
      it(`${base} @ ${tint} → ${expected}`, () => {
        expect(rgbToHex(tintHls(hexToRgb(base), tint))).toBe(expected);
      });
    }
  });
});
