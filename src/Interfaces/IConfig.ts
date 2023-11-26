interface IConfig {
  canvasSize: { width: number; height: number }

  rainbowMode: boolean // true = rainbow mode, false = normal mode
  skyColor: IHSLColor
  fireflies: {
    // speed in which firefly moves
    speedX: IRange
    speedY: IRange

    // speed in which firefly's speed increases
    accelerationX: number
    accelerationY: number
    accelerateInCurrentMovingDirection: boolean

    number: number // Number of fireflies
    size: IRange

    // if true: the size of firefly gets new random value when a firefly opacity reaches zero
    resetSizeWhenFaded: boolean

    /* =============================== Coloring Mode ========================================== */
    coloringMode: ColoringModes

    // if coloringMode = singleColor
    singleColorValue: IHSLColor

    // if coloringMode = randomHue
    hueRangeSpecification: {
      h: IRange
      s: number
      l: number
      a: number
    }

    // if coloringMode = randomSaturation
    saturationRangeSpecification: {
      h: number
      s: IRange
      l: number
      a: number
    }

    // if coloringMode = randomLightness
    lightnessRangeSpecification: {
      h: number
      s: number
      l: IRange
      a: number
    }

    // if coloringMode = randomHslColor
    hslColorRangeSpecification: {
      h: IRange
      s: IRange
      l: IRange
      a: IRange
    }

    // if coloringMode = randomHslColor
    // an array of selectable colors
    // selection weights get summed and based on
    // chance = (selectionWeight / sum)
    // the color gets selected
    weightedColorChoices: {
      value: IHSLColor
      selectionWeight: number
    }[]

    // when faded gets the color again
    resetColorWhenFaded: boolean

    /* ========================================================================================*/

    // rate of opacity decay
    opacityDecay: IRange
    randomOpacityWhenFaded: boolean
    opacityWhenFaded: IRange

    // if true: the decayAmount gets new random value when a firefly opacity reaches zero
    resetDecayAmountWhenFaded: boolean
    fadeSizeBehavior: {
      behaviorType: FadeSizeBehavior
      frequency: number
    }
    hueShiftMode: HueShiftModes
  }
}
