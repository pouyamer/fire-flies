interface IConfig {
  canvasSize: { width: number; height: number }

  rainbowMode: boolean // true = rainbow mode, false = normal mode
  skyColor: IHSLColor
  fireflies: {
    speed: IRange
    number: number // Number of fireflies
    size: IRange

    // if true: the size of firefly gets new random value when a firefly opacity reaches zero
    resetSizeWhenFaded: boolean

    color: IHSLColor
    // rate of opacity decay
    opacityDecay: IRange
    // if true: the decayAmount gets new random value when a firefly opacity reaches zero
    resetDecayAmountWhenFaded: boolean
  }
}
