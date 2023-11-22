const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 240,
    s: 10,
    l: 2,
    a: 1
  },
  fireflies: {
    speedX: {
      min: 0,
      max: 1
    },
    speedY: {
      min: 8,
      max: 10
    },
    number: 200,
    size: {
      min: 4,
      max: 7
    },

    resetSizeWhenFaded: false,

    color: {
      h: 60,
      s: 95,
      l: 75,
      a: 1
    },
    opacityDecay: {
      min: 0.001,
      max: 0.02
    },

    minOpacityValue: 1,

    resetDecayAmountWhenFaded: false,

    fadeSizeBehavior: {
      behaviorType: "none",
      frequency: 1
    },

    hueShiftMode: "none"
  }
}
