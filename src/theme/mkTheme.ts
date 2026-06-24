import type { Theme } from '@jsfkit/types';
import { mkColorScheme } from './mkColorScheme.ts';

export function mkTheme (pal: string[], majFont: string, minFont: string): Theme {
  return {
    name: 'Office Theme',
    colorScheme: mkColorScheme(pal),
    fontScheme: {
      name: 'Office',
      major: {
        latin: { typeface: majFont },
      },
      minor: {
        latin: { typeface: minFont },
      },
    },
  };
}
