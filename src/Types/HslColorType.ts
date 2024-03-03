// HslColorType:

/*

 HSL color system is a color model that
 uses Hue, Saturation, and Lightness
 to represent colors.

 
 It accepts 4 channels:
  - h (hue): hue is a number between 0 and 360,
    it indicates a circle of values, that goes
    from red, to orange, green, blue, purple,
    and returns to red.

  - s (saturation): in percents, it indicates
    how much the color is saturated. 0 being
    no saturation (grey) and 100 being
    completely saturated.

  - l (lightness): in percents, it indicates
    how light the color is. 0 being
    completely dark (black) and 100 being
    completely light (white).

  - a (alpha a.k.a transparency): between 0 and 1
    it indicates the opacity of the color,
    0 being completely transparent
    and 1 being completely opaque.

*/
type HslColorType = {
  h: number
  s: number
  l: number
  a: number
  toString?: () => string
}
