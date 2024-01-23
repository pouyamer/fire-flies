interface IConfig {
  canvasSize: { width: number; height: number }

  rainbowMode: boolean // true = rainbow mode, false = normal mode
  skyColor: IHSLColor
  fireflies: {
    // speed in which firefly moves
    speedX: IRange
    speedY: IRange

    // speed in which firefly's speed increases
    accelerationX: IRange
    accelerationY: IRange
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

    colorValueUpdate: {
      mode: ColorValueUpdateModeType
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
    }

    // if colorValueUpdateMode = singleColor
    singleColorValue: IHSLColor
    // NOTE: for other options,
    // app gets the rest of the values (h,s,l,a)
    // from singleColorValue
    // hue range for if colorValueUpdateMode = randomHue

    hueRangeSpecification: IRange

    // saturation range if colorValueUpdateMode = randomSaturation
    saturationRangeSpecification: IRange

    // lightness range if colorValueUpdateMode = randomLightness
    lightnessRangeSpecification: IRange

    // if colorValueUpdateMode = randomHslColor
    hslColorRangeSpecification: {
      h: IRange
      s: IRange
      l: IRange
      a: IRange
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

    // when faded gets the color again
    resetColorAfterFade: boolean

    /* ========================================================================================*/

    // rate (per frame) that a firefly fade (opacity decay)
    fadeRate: IRange
    resetFadeRateAfterFade: boolean
    newFadeRateAfterFade: IRange

    // what a firefly do after it gets out of bounds
    outOfBoundsPositioningBehaviour: OutOfBoundsPositioningBehaviours

    // in stopAtBound Mode
    stopAtBound: {
      toggleBounds: {
        top: boolean
        right: boolean
        bottom: boolean
        left: boolean
      }

      // if true: when a firefly gets out of bounds
      // due to bound disabling
      // it gets faded
      forceFadeWhenOutOfBounds: boolean
      // how much speed it's going to lose
      afterImpactSpeedMultiplier: {
        top: number
        right: number
        bottom: number
        left: number
      }
    }

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
