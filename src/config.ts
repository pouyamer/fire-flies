const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: true,
  skyColor: {
    h: 0,
    s: 0,
    l: 0,
    a: 1
  },
  fireflies: {
    speed: {
      min: 0.2,
      max: 1
    },
    number: 8000,
    size: {
      min: 1,
      max: 10
    },

    resetSizeWhenFaded: true,

    color: {
      h: 60,
      s: 95,
      l: 80,
      a: 1
    },
    opacityDecay: {
      min: 0.009,
      max: 0.02
    },
    resetDecayAmountWhenFaded: true
  }
}
