import type { SchemeColor, ThemeColorScheme } from '@jsfkit/types';

/**
 * Semantic scheme aliases that map to canonical scheme keys. Includes the canonical
 * keys allowing you to be sure that if you pass a key though, it will be valid.
 *
 * Used when resolving theme colors to RGBA, since ThemeColorScheme only has
 * the canonical twelve properties.
 */
export const SCHEME_KEYS: Record<SchemeColor['value'], 'lt1' | 'dk1' | 'lt2' | 'dk2' | 'accent1' | 'accent2' | 'accent3' | 'accent4' | 'accent5' | 'accent6' | 'hlink' | 'folHlink'> = {
  bg1: 'lt1',
  bg2: 'lt2',
  tx1: 'dk1',
  tx2: 'dk2',
  phClr: 'lt1',
  // passthrough
  lt1: 'lt1',
  dk1: 'dk1',
  lt2: 'lt2',
  dk2: 'dk2',
  accent1: 'accent1',
  accent2: 'accent2',
  accent3: 'accent3',
  accent4: 'accent4',
  accent5: 'accent5',
  accent6: 'accent6',
  hlink: 'hlink',
  folHlink: 'folHlink',
};

/**
 * The current default Office theme color scheme.
 */
export const DEFAULT_THEME_COLOR_SCHEME: ThemeColorScheme = {
  name: 'Office',
  dk1: { type: 'system', value: 'windowText' },
  lt1: { type: 'system', value: 'window' },
  dk2: { type: 'srgb', value: '44546A' },
  lt2: { type: 'srgb', value: 'E7E6E6' },
  accent1: { type: 'srgb', value: '4472C4' },
  accent2: { type: 'srgb', value: 'ED7D31' },
  accent3: { type: 'srgb', value: 'A5A5A5' },
  accent4: { type: 'srgb', value: 'FFC000' },
  accent5: { type: 'srgb', value: '5B9BD5' },
  accent6: { type: 'srgb', value: '70AD47' },
  hlink: { type: 'srgb', value: '0563C1' },
  folHlink: { type: 'srgb', value: '954F72' },
};

/**
 * OOXML indexed color palette (indices 0–63, plus 64/65 for system foreground/background).
 * The values are all 6-digit sRGB hex strings.
 */
export const INDEXED_COLORS: string[] = [
  /* eslint-disable @stylistic/array-element-newline */
  '000000', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', 'FF00FF', '00FFFF', // 0–7
  '000000', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', 'FF00FF', '00FFFF', // 8–15
  '800000', '008000', '000080', '808000', '800080', '008080', 'C0C0C0', '808080', // 16–23
  '9999FF', '993366', 'FFFFCC', 'CCFFFF', '660066', 'FF8080', '0066CC', 'CCCCFF', // 24–31
  '000080', 'FF00FF', 'FFFF00', '00FFFF', '800080', '800000', '008080', '0000FF', // 32–39
  '00CCFF', 'CCFFFF', 'CCFFCC', 'FFFF99', '99CCFF', 'FF99CC', 'CC99FF', 'FFCC99', // 40–47
  '3366FF', '33CCCC', '99CC00', 'FFCC00', 'FF9900', 'FF6600', '666699', '969696', // 48–55
  '003366', '339966', '003300', '333300', '993300', '993366', '333399', '333333', // 56–63
  '000000', 'FFFFFF',                                                             // 64–65: system foreground/background
  /* eslint-enable @stylistic/array-element-newline */
];

/**
 * Default RGB hex values for Windows system colors, used when resolving `system` Color values.
 * The values are all 6-digit sRGB hex strings.
 *
 * The values here are typical Windows defaults and match those produced by Excel.
 */
export const SYSTEM_COLORS: Record<string, string> = {
  // 'System Foreground': 'FF000000',
  // 'System Background': 'FFFFFFFF',
  '3dDkShadow': '696969',
  '3dLight': 'E3E3E3',
  'activeBorder': 'B4B4B4',
  'activeCaption': '99B4D1',
  'appWorkspace': 'ABABAB',
  'background': '000000',
  'btnFace': 'F0F0F0',
  'btnHighlight': 'FFFFFF',
  'btnShadow': 'A0A0A0',
  'btnText': '000000',
  'captionText': '000000',
  'gradientActiveCaption': 'B9D1EA',
  'gradientInactiveCaption': 'D7E4F2',
  'grayText': '6D6D6D',
  'highlight': '0078D7',
  'highlightText': 'FFFFFF',
  'hotLight': '0066CC',
  'inactiveBorder': 'F4F7FC',
  'inactiveCaption': 'BFCDDB',
  'inactiveCaptionText': '434E54',
  'infoBk': 'FFFFE1',
  'infoText': '000000',
  'menu': 'F0F0F0',
  'menuBar': 'F0F0F0',
  'menuHighlight': '0078D7',
  'menuText': '000000',
  'scrollBar': 'C8C8C8',
  'window': 'FFFFFF',
  'windowFrame': '646464',
  'windowText': '000000',
};

/**
 * OOXML preset color names mapped to 6-digit sRGB hex strings.
 *
 * These are the colors defined in ECMA-376 Part 1, section 20.1.10.47 (`ST_PresetColorVal`).
 */
export const PRESET_COLORS: Record<string, string> = {
  aliceBlue: 'F0F8FF',
  antiqueWhite: 'FAEBD7',
  aqua: '00FFFF',
  aquamarine: '7FFFD4',
  azure: 'F0FFFF',
  beige: 'F5F5DC',
  bisque: 'FFE4C4',
  black: '000000',
  blanchedAlmond: 'FFEBCD',
  blue: '0000FF',
  blueViolet: '8A2BE2',
  brown: 'A52A2A',
  burlyWood: 'DEB887',
  cadetBlue: '5F9EA0',
  chartreuse: '7FFF00',
  chocolate: 'D2691E',
  coral: 'FF7F50',
  cornflowerBlue: '6495ED',
  cornsilk: 'FFF8DC',
  crimson: 'DC143C',
  cyan: '00FFFF',
  darkBlue: '00008B',
  darkCyan: '008B8B',
  darkGoldenrod: 'B8860B',
  darkGray: 'A9A9A9',
  darkGreen: '006400',
  darkGrey: 'A9A9A9',
  darkKhaki: 'BDB76B',
  darkMagenta: '8B008B',
  darkOliveGreen: '556B2F',
  darkOrange: 'FF8C00',
  darkOrchid: '9932CC',
  darkRed: '8B0000',
  darkSalmon: 'E9967A',
  darkSeaGreen: '8FBC8F',
  darkSlateBlue: '483D8B',
  darkSlateGray: '2F4F4F',
  darkSlateGrey: '2F4F4F',
  darkTurquoise: '00CED1',
  darkViolet: '9400D3',
  deepPink: 'FF1493',
  deepSkyBlue: '00BFFF',
  dimGray: '696969',
  dimGrey: '696969',
  dkBlue: '00008B', // CSS color equivalent is "darkblue"
  dkCyan: '008B8B', // CSS color equivalent is "darkcyan"
  dkGoldenrod: 'B8860B', // CSS color equivalent is "darkgoldenrod"
  dkGray: 'A9A9A9', // CSS color equivalent is "darkgray"
  dkGreen: '006400', // CSS color equivalent is "darkgreen"
  dkGrey: 'A9A9A9', // CSS color equivalent is "darkgrey"
  dkKhaki: 'BDB76B', // CSS color equivalent is "darkkhaki"
  dkMagenta: '8B008B', // CSS color equivalent is "darkmagenta"
  dkOliveGreen: '556B2F', // CSS color equivalent is "darkolivegreen"
  dkOrange: 'FF8C00', // CSS color equivalent is "darkorange"
  dkOrchid: '9932CC', // CSS color equivalent is "darkorchid"
  dkRed: '8B0000', // CSS color equivalent is "darkred"
  dkSalmon: 'E9967A', // CSS color equivalent is "darksalmon"
  dkSeaGreen: '8FBC8B', // CSS color equivalent is "darkseagreen"
  dkSlateBlue: '483D8B', // CSS color equivalent is "darkslateblue"
  dkSlateGray: '2F4F4F', // CSS color equivalent is "darkslategray"
  dkSlateGrey: '2F4F4F', // CSS color equivalent is "darkslategrey"
  dkTurquoise: '00CED1', // CSS color equivalent is "darkturquoise"
  dkViolet: '9400D3', // CSS color equivalent is "darkviolet"
  dodgerBlue: '1E90FF',
  firebrick: 'B22222',
  floralWhite: 'FFFAF0',
  forestGreen: '228B22',
  fuchsia: 'FF00FF',
  gainsboro: 'DCDCDC',
  ghostWhite: 'F8F8FF',
  gold: 'FFD700',
  goldenrod: 'DAA520',
  gray: '808080',
  green: '008000',
  greenYellow: 'ADFF2F',
  grey: '808080',
  honeydew: 'F0FFF0',
  hotPink: 'FF69B4',
  indianRed: 'CD5C5C',
  indigo: '4B0082',
  ivory: 'FFFFF0',
  khaki: 'F0E68C',
  lavender: 'E6E6FA',
  lavenderBlush: 'FFF0F5',
  lawnGreen: '7CFC00',
  lemonChiffon: 'FFFACD',
  lightBlue: 'ADD8E6',
  lightCoral: 'F08080',
  lightCyan: 'E0FFFF',
  lightGoldenrodYellow: 'FAFAD2',
  lightGray: 'D3D3D3',
  lightGreen: '90EE90',
  lightGrey: 'D3D3D3',
  lightPink: 'FFB6C1',
  lightSalmon: 'FFA07A',
  lightSeaGreen: '20B2AA',
  lightSkyBlue: '87CEFA',
  lightSlateGray: '778899',
  lightSlateGrey: '778899',
  lightSteelBlue: 'B0C4DE',
  lightYellow: 'FFFFE0',
  lime: '00FF00',
  limeGreen: '32CD32',
  linen: 'FAF0E6',
  ltBlue: 'ADD8E6', // CSS color equivalent is "lightblue"
  ltCoral: 'F08080', // CSS color equivalent is "lightcoral"
  ltCyan: 'E0FFFF', // CSS color equivalent is "lightcyan"
  ltGoldenrodYellow: 'FAFA78', // CSS color equivalent is "lightgoldenrodyellow"
  ltGray: 'D3D3D3', // CSS color equivalent is "lightgray"
  ltGreen: '90EE90', // CSS color equivalent is "lightgreen"
  ltGrey: 'D3D3D3', // CSS color equivalent is "lightgrey"
  ltPink: 'FFB6C1', // CSS color equivalent is "lightpink"
  ltSalmon: 'FFA07A', // CSS color equivalent is "lightsalmon"
  ltSeaGreen: '20B2AA', // CSS color equivalent is "lightseagreen"
  ltSkyBlue: '87CEFA', // CSS color equivalent is "lightskyblue"
  ltSlateGray: '778899', // CSS color equivalent is "lightslategray"
  ltSlateGrey: '778899', // CSS color equivalent is "lightslategrey"
  ltSteelBlue: 'B0C4DE', // CSS color equivalent is "lightsteelblue"
  ltYellow: 'FFFFE0', // CSS color equivalent is "lightyellow"
  magenta: 'FF00FF',
  maroon: '800000',
  medAquamarine: '66CDAA', // CSS color equivalent is "mediumaquamarine"
  medBlue: '0000CD', // CSS color equivalent is "mediumblue"
  mediumAquamarine: '66CDAA',
  mediumBlue: '0000CD',
  mediumOrchid: 'BA55D3',
  mediumPurple: '9370DB',
  mediumSeaGreen: '3CB371',
  mediumSlateBlue: '7B68EE',
  mediumSpringGreen: '00FA9A',
  mediumTurquoise: '48D1CC',
  mediumVioletRed: 'C71585',
  medOrchid: 'BA55D3', // CSS color equivalent is "mediumorchid"
  medPurple: '9370DB', // CSS color equivalent is "mediumpurple"
  medSeaGreen: '3CB371', // CSS color equivalent is "mediumseagreen"
  medSlateBlue: '7B68EE', // CSS color equivalent is "mediumslateblue"
  medSpringGreen: '00FA9A', // CSS color equivalent is "mediumspringgreen"
  medTurquoise: '48D1CC', // CSS color equivalent is "mediumturquoise"
  medVioletRed: 'C71585', // CSS color equivalent is "mediumvioletred"
  midnightBlue: '191970',
  mintCream: 'F5FFFA',
  mistyRose: 'FFE4E1',
  moccasin: 'FFE4B5',
  navajoWhite: 'FFDEAD',
  navy: '000080',
  oldLace: 'FDF5E6',
  olive: '808000',
  oliveDrab: '6B8E23',
  orange: 'FFA500',
  orangeRed: 'FF4500',
  orchid: 'DA70D6',
  paleGoldenrod: 'EEE8AA',
  paleGreen: '98FB98',
  paleTurquoise: 'AFEEEE',
  paleVioletRed: 'DB7093',
  papayaWhip: 'FFEFD5',
  peachPuff: 'FFDAB9',
  peru: 'CD853F',
  pink: 'FFC0CB',
  plum: 'DDA0DD',
  powderBlue: 'B0E0E6',
  purple: '800080',
  red: 'FF0000',
  rosyBrown: 'BC8F8F',
  royalBlue: '4169E1',
  saddleBrown: '8B4513',
  salmon: 'FA8072',
  sandyBrown: 'F4A460',
  seaGreen: '2E8B57',
  seaShell: 'FFF5EE',
  sienna: 'A0522D',
  silver: 'C0C0C0',
  skyBlue: '87CEEB',
  slateBlue: '6A5ACD',
  slateGray: '708090',
  slateGrey: '708090',
  snow: 'FFFAFA',
  springGreen: '00FF7F',
  steelBlue: '4682B4',
  tan: 'D2B48C',
  teal: '008080',
  thistle: 'D8BFD8',
  tomato: 'FF6347',
  turquoise: '40E0D0',
  violet: 'EE82EE',
  wheat: 'F5DEB3',
  white: 'FFFFFF',
  whiteSmoke: 'F5F5F5',
  yellow: 'FFFF00',
  yellowGreen: '9ACD32',
};
