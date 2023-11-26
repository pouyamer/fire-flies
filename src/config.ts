const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 75,
    l: 0,
    a: 1
  },
  fireflies: {
    number: 120,

    speedX: {
      min: -1,
      max: 1
    },
    speedY: {
      min: 0,
      max: 0
    },
    accelerationX: 0.0,
    accelerationY: 10 / 60,
    accelerateInCurrentMovingDirection: false,

    size: {
      min: 12,
      max: 35
    },

    coloringMode: "randomHslColor",

    singleColorValue: {
      h: 200,
      s: 100,
      l: 100,
      a: 1
    },

    hueRangeSpecification: {
      h: {
        min: 100,
        max: 200
      },
      s: 100,
      l: 70,
      a: 1
    },

    saturationRangeSpecification: {
      h: 220,
      s: {
        min: 20,
        max: 100
      },
      l: 65,
      a: 1
    },

    lightnessRangeSpecification: {
      h: 220,
      s: 100,
      l: {
        min: 60,
        max: 100
      },
      a: 1
    },

    hslColorRangeSpecification: {
      h: {
        min: 180,
        max: 140
      },
      s: {
        min: 70,
        max: 100
      },
      l: {
        min: 20,
        max: 50
      },
      a: {
        min: 0,
        max: 1
      }
    },

    weightedColorChoices: [
      // color 1:
      {
        value: {
          h: 0,
          s: 100,
          l: 70,
          a: 1
        },
        selectionWeight: 1
      },

      // color 2:
      {
        value: {
          h: 20,
          s: 100,
          l: 70,
          a: 1
        },
        selectionWeight: 2
      },

      // color 3:
      {
        value: {
          h: 120,
          s: 100,
          l: 70,
          a: 1
        },
        selectionWeight: 1
      }
    ],

    opacityDecay: {
      min: 0.01,
      max: 0.03
    },

    resetDecayAmountWhenFaded: false,
    resetColorWhenFaded: true,
    randomOpacityWhenFaded: true,
    resetSizeWhenFaded: true,

    outOfBoundsPositioningBehaviour: "none",
    fadePositioningBehaviour: "restartAtRandomPosition",

    resetSpeedWhenOutOfBounds: true,

    outOfBoundsRestartPosition: {
      x: 0,
      y: -10
    },
    fadeRestartPosition: {
      x: innerWidth / 2,
      y: innerHeight
    },

    opacityWhenFaded: {
      min: 1,
      max: 1
    },

    fadeSizeBehavior: {
      behaviorType: "none",
      frequency: 1
    },

    hueShiftMode: "none"
  }
}
