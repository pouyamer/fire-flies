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

    color: IHSLColor
    // rate of opacity decay
    opacityDecay: IRange

    // When firefly dies,
    // the opacity is recalculated using Math.random() * (1 - minOpacityValue) + minOpacityValue
    // [0 - 1]
    minOpacityValue: number
    // if true: the decayAmount gets new random value when a firefly opacity reaches zero
    resetDecayAmountWhenFaded: boolean
    fadeSizeBehavior: {
      behaviorType: FadeSizeBehavior
      frequency: number
    }
    hueShiftMode: HueShiftModes
  }
}
