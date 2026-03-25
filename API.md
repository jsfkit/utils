
<a name="readmemd"></a>

# @jsfkit/utils

## Type Aliases

- [RGB](#type-aliasesrgbmd)
- [RGBA](#type-aliasesrgbamd)

## Variables

- [DEFAULT\_THEME\_COLOR\_SCHEME](#variablesdefault_theme_color_schememd)
- [INDEXED\_COLORS](#variablesindexed_colorsmd)
- [PRESET\_COLORS](#variablespreset_colorsmd)
- [SYSTEM\_COLORS](#variablessystem_colorsmd)

## Functions

- [applyColorTransforms](#functionsapplycolortransformsmd)
- [emuToPx](#functionsemutopxmd)
- [getPatternData](#functionsgetpatterndatamd)
- [parseRGBA](#functionsparsergbamd)
- [pxToEmu](#functionspxtoemumd)
- [rgbaToString](#functionsrgbatostringmd)
- [rgbToString](#functionsrgbtostringmd)
- [toRGBA](#functionstorgbamd)


<a name="functionsapplycolortransformsmd"></a>

# applyColorTransforms()

```ts
function applyColorTransforms(rgba: RGBA, transforms: ColorTransform[]): RGBA;
```

Given a set of RGBA colors, apply a list of color transformations on them and return the result.
Note that the [toRGBA](#functionstorgbamd) function does this automatically.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgba` | [`RGBA`](#type-aliasesrgbamd) | The base RGBA color to use. |
| `transforms` | `ColorTransform`[] | A list of `ColorTransform` objects to apply. |

## Returns

[`RGBA`](#type-aliasesrgbamd)

A transformed RGBA color.


<a name="functionsemutopxmd"></a>

# emuToPx()

```ts
function emuToPx(emu: number): number;
```

Convert a number from EMU (English Metric Units) to pixels, assuming the Excel default of 72 DPI.
Refer to the JSF spec for documentation on the EMU.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emu` | `number` | An EMU size that should be converted to pixels. |

## Returns

`number`

The same measure computed to pixels.


<a name="functionsgetpatterndatamd"></a>

# getPatternData()

```ts
function getPatternData(
   patternName: PatternStyle | FillPatternStyle, 
   patternColor: RGBA | RGB, 
   fillColor: RGBA | RGB): Uint8ClampedArray;
```

Return a 256 byte Uint8ClampedArray corresponding to an 8x8 pattern (of 4 bytes per pixel).
This can then be used in an ImageData interface to paint the pattern on a canvas.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patternName` | `PatternStyle` \| `FillPatternStyle` | The name of the pattern. |
| `patternColor` | [`RGBA`](#type-aliasesrgbamd) \| [`RGB`](#type-aliasesrgbmd) | The color for the pattern foreground fill. |
| `fillColor` | [`RGBA`](#type-aliasesrgbamd) \| [`RGB`](#type-aliasesrgbmd) | The color for the pattern background fill. |

## Returns

`Uint8ClampedArray`

The pattern as a 256 byte Uint8ClampedArray.


<a name="functionsparsergbamd"></a>

# parseRGBA()

```ts
function parseRGBA(value?: string): RGBA;
```

Parse a hex color string into an RGBA channel set.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value?` | `string` | The string to parse. |

## Returns

[`RGBA`](#type-aliasesrgbamd)

A list of the R, G, B, and A channels.


<a name="functionspxtoemumd"></a>

# pxToEmu()

```ts
function pxToEmu(px: number): number;
```

Convert a number from pixels to EMU (English Metric Units), assuming the Excel default of 72 DPI.
Refer to the JSF spec for documentation on the EMU.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `px` | `number` | A pixel size that should be converted to EMU. |

## Returns

`number`

The same size computed to EMU.


<a name="functionsrgbtostringmd"></a>

# rgbToString()

```ts
function rgbToString(rgba: RGBA | RGB): string;
```

Stringify RGB or RGBA values into a hex color string without a hash prefix.

The output will always be a 6 digit string regardless of the alpha
channel value.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgba` | [`RGBA`](#type-aliasesrgbamd) \| [`RGB`](#type-aliasesrgbmd) | The RGBA or RGB values to render. |

## Returns

`string`

A 6 digit hex color string (`FFC823`).


<a name="functionsrgbatostringmd"></a>

# rgbaToString()

```ts
function rgbaToString(rgba: RGBA | RGB): string;
```

Stringify RGBA values into a hex color string without a hash prefix.

The output will always be an 8 digit string regardless of the alpha
channel value. The channel order is web-style: `RRGGBBAA`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgba` | [`RGBA`](#type-aliasesrgbamd) \| [`RGB`](#type-aliasesrgbmd) | The RGBA values to render. |

## Returns

`string`

An 8 digit hex color string (`FFC823FF`).


<a name="functionstorgbamd"></a>

# toRGBA()

```ts
function toRGBA(
   color: Color, 
   themeColors?: ThemeColorScheme, 
   indexedColors?: string[]): RGBA;
```

Resolves a JSF Color object to an RGBA tuple.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `color` | `Color` | `undefined` | A JSF Color object. |
| `themeColors?` | `ThemeColorScheme` | `DEFAULT_THEME_COLOR_SCHEME` | A JSF ThemeColorScheme used to resolve Schema colors. |
| `indexedColors?` | `string`[] | `INDEXED_COLORS` | A list of 6-digit hex codes to use to |

## Returns

[`RGBA`](#type-aliasesrgbamd)


<a name="type-aliasesrgbmd"></a>

# RGB

```ts
type RGB = [number, number, number];
```

A set of numbers representing R, G, and B, color channels respectively.
The color is assumed to use the sRGB colorspace.

All values range from 0 to 255.


<a name="type-aliasesrgbamd"></a>

# RGBA

```ts
type RGBA = [number, number, number, number];
```

A set of numbers representing R, G, B, and A, color channels respectively.
The color is assumed to use the sRGB colorspace.

R, G, and B values range from 0 to 255.
A ranges from 0 to 1.


<a name="variablesdefault_theme_color_schememd"></a>

# DEFAULT\_THEME\_COLOR\_SCHEME

```ts
const DEFAULT_THEME_COLOR_SCHEME: ThemeColorScheme;
```

The current default Office theme color scheme.


<a name="variablesindexed_colorsmd"></a>

# INDEXED\_COLORS

```ts
const INDEXED_COLORS: string[];
```

OOXML indexed color palette (indices 0–63, plus 64/65 for system foreground/background).
The values are all 6-digit sRGB hex strings.


<a name="variablespreset_colorsmd"></a>

# PRESET\_COLORS

```ts
const PRESET_COLORS: Record<string, string>;
```

OOXML preset color names mapped to 6-digit sRGB hex strings.

These are the colors defined in ECMA-376 Part 1, section 20.1.10.47 (`ST_PresetColorVal`).


<a name="variablessystem_colorsmd"></a>

# SYSTEM\_COLORS

```ts
const SYSTEM_COLORS: Record<string, string>;
```

Default RGB hex values for Windows system colors, used when resolving `system` Color values.
The values are all 6-digit sRGB hex strings.

The values here are typical Windows defaults and match those produced by Excel.
