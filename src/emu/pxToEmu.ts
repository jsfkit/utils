const EMU = 12700; // 914400 / 72;

/**
 * Convert a number from pixels to EMU (English Metric Units), assuming the Excel default of 72 DPI.
 * Refer to the JSF spec for documentation on the EMU.
 *
 * @param px A pixel size that should be converted to EMU.
 * @returns The same size computed to EMU.
 */
export function pxToEmu (px: number) {
  return Math.round(px * EMU);
}
