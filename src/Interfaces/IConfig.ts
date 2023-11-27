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

    // Jitter applies so that the directions
    // gets a bit randomized
    // 0 is for no jitter
    jitterCoefficientX: IRange
    jitterCoefficientY: IRange

    number: number // Number of fireflies
    size: IRange

    // if true: the size of firefly gets new random value when a firefly opacity reaches zero
    resetSizeAfterFade: boolean

    /* =============================== Coloring Mode ========================================== */
    coloringMode: ColoringModes

    // if coloringMode = singleColor
    singleColorValue: IHSLColor
    // NOTE: for other options,
    // app gets the rest of the values (h,s,l,a)
    // from singleColorValue

    // hue range for if coloringMode = randomHue
    hueRangeSpecification: IRange

    // saturation range if coloringMode = randomSaturation
    saturationRangeSpecification: IRange

    // lightness range if coloringMode = randomLightness
    lightnessRangeSpecification: IRange

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
    resetColorAfterFade: boolean

    /* ========================================================================================*/

    // rate (per frame) that a firefly fade (opacity decay)
    fadeRate: IRange
    resetFadeRateAfterFade: boolean
    newFadeRateAfterFade: IRange

    // what a firefly do after it gets out of bounds
    outOfBoundsPositioningBehaviour: OutOfBoundsPositioningBehaviours
    // -- position for
    // -- if afterOutOfBoundBehavior = restartAtSetPosition
    newPositionAfterOutOfBounds: {
      x: number
      y: number
    }

    resetSpeedsAfterOutOfBounds: boolean

    // if true: the decayAmount gets new random value when a firefly opacity reaches zero
    sizeBehaviourWhenFading: {
      behaviorType: FadeSizeBehavior
      frequency: number
    }

    // it determines what new position fireflies have
    // after fading
    fadePositioningBehaviour: FadePositioningBehaviours
    newPositionAfterFade: {
      x: number
      y: number
    }
    hueShiftMode: HueShiftModes
  }
}
