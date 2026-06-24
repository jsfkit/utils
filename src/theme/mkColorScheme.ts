import type { ThemeColorScheme } from '@jsfkit/types';

export function mkColorScheme (pal: string[] = [], name: string = 'Office'): ThemeColorScheme {
  return {
    name: name,
    dk1: { type: 'system', value: 'windowText' },
    lt1: { type: 'system', value: 'window' },
    dk2: { type: 'srgb', value: pal[0] || '0E2841' },
    lt2: { type: 'srgb', value: pal[1] || 'E8E8E8' },
    accent1: { type: 'srgb', value: pal[2] || '156082' },
    accent2: { type: 'srgb', value: pal[3] || 'E97132' },
    accent3: { type: 'srgb', value: pal[4] || '196B24' },
    accent4: { type: 'srgb', value: pal[5] || '0F9ED5' },
    accent5: { type: 'srgb', value: pal[6] || 'A02B93' },
    accent6: { type: 'srgb', value: pal[7] || '4EA72E' },
    hlink: { type: 'srgb', value: pal[8] || '467886' },
    folHlink: { type: 'srgb', value: pal[9] || '96607D' },
  };
}
