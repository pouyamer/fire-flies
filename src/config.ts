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
    number: 300,

    speedX: {
      min: 0,
      max: 0
    },
    speedY: {
      min: 0,
      max: 2
    },

    accelerationX: 0,
    accelerationY: 0,
    accelerateInCurrentMovingDirection: false,

    jitterCoefficientX: {
      min: 0,
      max: 1
    },
    jitterCoefficientY: {
      min: 0,
      max: 1
    },

    size: {
      min: 5,
      max: 10
    },

    colorValueUpdate: {
      mode: "updatingHue",
      startingMehtod: "min",
      onFadeMethod: "increasing",
      increasingOrDecreasingOnFade: 2,
      increasingOrDecreasingOnFadeAllValues: {
        h: 50,
        s: 5,
        l: 4,
        a: 0
      }
    },

    singleColorValue: {
      h: 75,
      s: 85,
      l: 75,
      a: 1
    },

    hueRangeSpecification: {
      min: 0,
      max: 360
    },

    saturationRangeSpecification: {
      min: 30,
      max: 90
    },

    lightnessRangeSpecification: {
      min: 50,
      max: 85
    },

    hslColorRangeSpecification: {
      h: {
        min: 0,
        max: 140
      },
      s: {
        min: 70,
        max: 100
      },
      l: {
        min: 50,
        max: 100
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
          h: 50,
          s: 100,
          l: 70,
          a: 1
        },
        selectionWeight: 1
      },
      // color 4:
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

    fadeRate: {
      min: 0.001,
      max: 0.003
    },

    resetColorAfterFade: true,
    resetSizeAfterFade: false,
    resetFadeRateAfterFade: true,

    outOfBoundsPositioningBehaviour: "forceFade",
    fadePositioningBehaviour: "restartAtRandomXPosition",

    resetSpeedsAfterOutOfBounds: false,

    newPositionAfterOutOfBounds: {
      x: 0,
      y: -10
    },
    newPositionAfterFade: {
      x: innerWidth / 2,
      y: 0
    },

    newFadeRateAfterFade: {
      min: 1,
      max: 1
    },

    sizeBehaviourWhenFading: {
      behaviorType: "none",
      frequency: 1
    },

    hueShiftMode: "onArrowKeys"
  }
}
