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
    number: 200,

    speedX: {
      min: -4,
      max: 4
    },
    speedY: {
      min: 0,
      max: 6
    },
    accelerationX: 0,
    accelerationY: 0.1,
    accelerateInCurrentMovingDirection: false,

    size: {
      min: 3,
      max: 20
    },

    resetSizeWhenFaded: true,

    coloringMode: "randomHue",

    singleColorValue: {
      h: 200,
      s: 100,
      l: 70,
      a: 1
    },

    hueRangeSpecification: {
      h: {
        min: 0,
        max: 150
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
        min: 330,
        max: 360
      },
      s: {
        min: 70,
        max: 100
      },
      l: {
        min: 30,
        max: 80
      },
      a: {
        min: 0.8,
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
      max: 0.06
    },

    resetDecayAmountWhenFaded: false,
    resetColorWhenFaded: true,
    randomOpacityWhenFaded: true,
    opacityWhenFaded: {
      min: 0.7,
      max: 1
    },

    fadeSizeBehavior: {
      behaviorType: "none",
      frequency: 1
    },

    hueShiftMode: "none"
  }
}
