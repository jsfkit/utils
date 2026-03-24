const EMU = 12700; // 914400 / 72;

/**
 * Convert a number from EMU (English Metric Units) to pixels, assuming the Excel default of 72 DPI.
 * Refer to the JSF spec for documentation on the EMU.
 *
 * @param emu An EMU size that should be converted to pixels.
 * @returns The same measure computed to pixels.
 */
export function emuToPx (emu: number) {
  const px = emu / EMU;
  return Math.round(px * 1e5) / 1e5;
}
