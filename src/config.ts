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
      min: -1,
      max: 1
    },
    speedY: {
      min: -0.5,
      max: 1
    },
    accelerationX: 0.0025,
    accelerationY: 0.001,
    accelerateInCurrentMovingDirection: true,

    number: 500,
    size: {
      min: 5,
      max: 10
    },

    resetSizeWhenFaded: false,

    color: {
      h: 15,
      s: 100,
      l: 70,
      a: 1
    },
    opacityDecay: {
      min: 0.005,
      max: 0.009
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
