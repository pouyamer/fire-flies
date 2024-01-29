type ColorValueConfigType = {
  updateMode: ColorValueUpdateModeType
  // how does the app gets the firefly value
  // based on the range specification of
  // different color values (h,s,l,a)

  // -- OnStart
  startingMehtod: ColorRangeSpecificationStartingModeType
  // -- OnFade
  onFadeMethod: ColorDeterminationMethodType
  // on fade,
  // how much the value gets inc or dec
  increasingOrDecreasingOnFade: number
  // on fade,
  // when colorValueUpdateMode: randomHslColor
  // how much all the values gets inc or dec
  increasingOrDecreasingOnFadeAllValues: IHSLColor

  // if colorValueUpdateMode = singleColor
  singleColorValue: IHSLColor
  // NOTE: for other options,
  // app gets the rest of the values (h,s,l,a)
  // from singleColorValue
  // hue range for if colorValueUpdateMode = randomHue

  hueRangeSpecification: RangeType

  // saturation range if colorValueUpdateMode = randomSaturation
  saturationRangeSpecification: RangeType

  // lightness range if colorValueUpdateMode = randomLightness
  lightnessRangeSpecification: RangeType

  // if colorValueUpdateMode = randomHslColor
  hslColorRangeSpecification: {
    h: RangeType
    s: RangeType
    l: RangeType
    a: RangeType
  }

  // if colorValueUpdateMode = randomHslColor
  // an array of selectable colors
  // selection weights get summed and based on
  // chance = (selectionWeight / sum)
  // the color gets selected
  weightedColorChoices: {
    value: IHSLColor
    selectionWeight: number
  }[]
}
