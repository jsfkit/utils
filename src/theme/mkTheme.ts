import type { Theme } from '@jsfkit/types';
import { mkColorScheme } from './mkColorScheme.ts';
import { deepFreeze } from '../deepFreeze.ts';

export function mkTheme (pal: string[], majFont: string, minFont: string): Readonly<Theme> {
  return deepFreeze({
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
  });
}
