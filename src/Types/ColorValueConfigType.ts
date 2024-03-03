type ColorValueConfigType = {
  // Determine how the color value is updated
  // currently range and color choices are supported
  updateMode: ColorValueUpdateModeType

  // -- OnStart
  //    how the app gets different hsl values
  //    once the app runs

  // -- -- for range:
  startingMehtod: {
    h: ColorRangeSpecificationStartingModeType
    s: ColorRangeSpecificationStartingModeType
    l: ColorRangeSpecificationStartingModeType
    a: ColorRangeSpecificationStartingModeType
  }

  // -- -- for color choices:
  startingMethodForColorChoices: ColorRangeSpecificationStartingModeType

  // -- OnFade
  //    how the app gets different hsl values
  //    after each time firefly fades
  onFadeMethod: {
    h: ColorDeterminationMethodType
    s: ColorDeterminationMethodType
    l: ColorDeterminationMethodType
    a: ColorDeterminationMethodType
  }

  // on fade,
  // when colorValueUpdateMode: randomHslColor
  // how much all the values gets inc or dec
  incrementOnFade: HslColorType

  // If firefly should change the hsla value
  // once it fades
  hslColorShouldChangeAfterFade: {
    h: boolean
    s: boolean
    l: boolean
    a: boolean
  }

  // if hslColorShouldChange in any of the
  // hslValues are true,
  // at which range should the value change

  hslColorChangeRange: {
    h: RangeType
    s: RangeType
    l: RangeType
    a: RangeType
  }

  // -- Weighted Color Choices
  // if colorValueUpdateMode: multipleColorValues
  // how the color choices are weighted
  // for example 2 of yellow and 1 of red
  weightedColorChoices: {
    value: HslColorType
    selectionWeight: number
  }[]
}
