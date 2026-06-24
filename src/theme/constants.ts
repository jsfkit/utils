import type { Theme } from '@jsfkit/types';
import { mkTheme } from './mkTheme.ts';

/**
 * A lookup of default Office theme definitions keyed by Excel build number.
 *
 * Each entry corresponds to the default theme that shipped with a specific
 * version of Excel. The `"default"` key always points to the current
 * (most recent) theme.
 */
export const THEMES: Record<string, Theme> = {
  // Excel 2007
  123820:  mkTheme([ '1F497D', 'EEECE1', '4F81BD', 'C0504D', '9BBB59', '8064A2', '4BACC6', 'F79646', '0000FF', '800080' ], 'Cambria', 'Calibri'),
  // Excel 2010
  124226:  mkTheme([ '1F497D', 'EEECE1', '4F81BD', 'C0504D', '9BBB59', '8064A2', '4BACC6', 'F79646', '0000FF', '800080' ], 'Cambria', 'Calibri'),
  // Excel 2013
  153222:  mkTheme([ '44546A', 'E7E6E6', '5B9BD5', 'ED7D31', 'A5A5A5', 'FFC000', '4472C4', '70AD47', '0563C1', '954F72' ], 'Calibri Light', 'Calibri'),
  // Excel 2016
  164011:  mkTheme([ '44546A', 'E7E6E6', '5B9BD5', 'ED7D31', 'A5A5A5', 'FFC000', '4472C4', '70AD47', '0563C1', '954F72' ], 'Calibri Light', 'Calibri'),
  // Excel 2019 / Early 365
  166925:  mkTheme([ '44546A', 'E7E6E6', '4472C4', 'ED7D31', 'A5A5A5', 'FFC000', '5B9BD5', '70AD47', '0563C1', '954F72' ], 'Calibri Light', 'Calibri'),
  // Excel 2021 / Modern 365
  202300:  mkTheme([ '0E2841', 'E8E8E8', '156082', 'E97132', '196B24', '0F9ED5', 'A02B93', '4EA72E', '467886', '96607D' ], 'Aptos Display', 'Aptos Narrow'),
  // current theme
  default: mkTheme([ '0E2841', 'E8E8E8', '156082', 'E97132', '196B24', '0F9ED5', 'A02B93', '4EA72E', '467886', '96607D' ], 'Aptos Display', 'Aptos Narrow'),
};
