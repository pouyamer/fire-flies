interface IConfig {
  canvasSize: { width: number; height: number }

  rainbowMode: boolean // true = rainbow mode, false = normal mode
  skyColor: IHSLColor
  fireflies: {
    // speed in which firefly moves
    speedX: RangeType
    speedY: RangeType

    // speed in which firefly's speed increases
    accelerationX: RangeType
    accelerationY: RangeType
    accelerateInCurrentMovingDirection: boolean

    // Jitter applies so that the directions
    // gets a bit randomized
    // 0 is for no jitter
    jitterCoefficientX: RangeType
    jitterCoefficientY: RangeType

    /* ===== Rotation ===== */
    //  starting Angle
    startingAngle: number
    //  if true, starting angle will be randomized
    //  ignores startingAngle
    startAngleOnRandom: boolean
    //  rate (radian) of rotation per frame
    rotationSpeed: RangeType
    //  rate of rotation speed change
    rotationAcceleration: RangeType

    /* =================== */

    // Number of fireflies
    count: number

    // Size Range of butterflies
    size: RangeType

    // how many is going to glow otherwise fade
    fadeRatio: number

    fade: {
      // rate (per frame) that a firefly fade (opacity decay)
      rate: RangeType
      resetRateAfterFade: boolean
      opacityAfterFade: RangeType
      // if true: the size of firefly gets new random value when a firefly opacity reaches zero
      resetSizeAfterFade: boolean

      // when faded gets the color again
      resetColorAfterFade: boolean

      // it determines what new position fireflies have
      // after fading
      positioningBehaviour: FadeOrGlowPositioningBehaviourType
      sizeChangeBehaviour: {
        behaviorType: FadeOrGlowSizeBehaviorType
        frequency: number
      }
      newPositionAfterFade: {
        x: number
        y: number
      }
    }

    glow: {
      // rate (per frame) that a firefly glow (opacity increase)
      rate: RangeType
      resetRateAfterGlow: boolean
      opacityAfterGlow: RangeType
      // if true: the size of firefly gets new random value when a firefly opacity reaches 1
      resetSizeAfterGlow: boolean

      // when Glown gets the color again
      resetColorAfterGlow: boolean

      // it determines what new position fireflies have
      // after fading
      positioningBehaviour: FadeOrGlowPositioningBehaviourType
      sizeChangeBehaviour: {
        behaviorType: FadeOrGlowSizeBehaviorType
        frequency: number
      }
      newPositionAfterGlow: {
        x: number
        y: number
      }
    }
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

    /* ========================================================================================*/

    // what a firefly do after it gets out of bounds
    outOfBoundsPositioningBehaviour: OutOfBoundsPositioningBehaviours

    shape: ShapeType

    // config for regular polygon shape
    regularPolygon: {
      // must be more than three
      sideCount: RangeType
    }

    // bounds behaviour
    bounds: {
      toggleBounds: DirectionalBooleanType

      // if true: when a firefly gets out of bounds
      // due to bound disabling

      // how much speed it's going to lose
      afterImpactSpeedMultiplier: DirectionalNumberType
      // how much hue increases after it touches the bounds
      hueIncreaseAmountAfterImpact: DirectionalNumberType

      sizeMultiplierAfterImpact: DirectionalNumberType
    }

    // -- position for
    // -- if afterOutOfBoundBehavior = restartAtSetPosition
    newPositionAfterOutOfBounds: {
      x: number
      y: number
    }

    resetSpeedsAfterOutOfBounds: boolean

    // if true: the decayAmount gets new random value when a firefly opacity reaches zero

    hueShiftMode: HueShiftModes
  }
}
