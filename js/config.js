const config = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false, // true = rainbow mode, false = normal mode
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
    number: 8000, // Number of fireflies
    size: {
      min: 1,
      max: 10
    },

    // if true: the size of firefly gets new random value when a firefly opacity reaches zero
    resetSizeWhenFaded: true,

    color: {
      h: 60,
      s: 95,
      l: 80,
      a: 1
    },
    // rate of opacity decay
    opacityDecay: {
      min: 0.001,
      max: 0.009
    },
    // if true: the decayAmount gets new random value when a firefly opacity reaches zero
    resetDecayAmountWhenFaded: true
  }
}
