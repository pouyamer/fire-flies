const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 75,
    l: 2,
    a: 1
  },
  fireflies: {
    number: 1000,
    size: {
      min: 1,
      max: 20
    },

    speedX: {
      min: -2,
      max: 2
    },
    speedY: {
      min: -3,
      max: 3
    },

    accelerationX: {
      min: 0,
      max: 0
    },
    accelerationY: {
      min: 0,
      max: 0.2
    },
    accelerateInCurrentMovingDirection: false,

    jitterCoefficientX: {
      min: 0,
      max: 0
    },
    jitterCoefficientY: {
      min: 0,
      max: 0
    },

    colorValueUpdate: {
      mode: "updatingHue",
      startingMehtod: "random",
      onFadeMethod: "random",
      increasingOrDecreasingOnFade: 2,
      increasingOrDecreasingOnFadeAllValues: {
        h: 50,
        s: 5,
        l: 4,
        a: 0
      }
    },

    singleColorValue: {
      h: 40,
      s: 85,
      l: 50,
      a: 1
    },

    hueRangeSpecification: {
      min: 120,
      max: 240
    },

    saturationRangeSpecification: {
      min: 30,
      max: 90
    },

    lightnessRangeSpecification: {
      min: 10,
      max: 81
    },

    hslColorRangeSpecification: {
      h: {
        min: 0,
        max: 60
      },
      s: {
        min: 70,
        max: 100
      },
      l: {
        min: 20,
        max: 85
      },
      a: {
        min: 1,
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
      min: 0.0,
      max: 0.001
      // min: 0,
      // max: 0
    },

    resetColorAfterFade: true,
    resetSizeAfterFade: false,
    resetFadeRateAfterFade: true,

    outOfBoundsPositioningBehaviour: "forceFade",
    fadePositioningBehaviour: "restartAtRandomXPosition",

    bounds: {
      toggleBounds: {
        top: true,
        right: false,
        bottom: true,
        left: false
      },
      afterImpactSpeedMultiplier: {
        top: 1,
        right: 1,
        bottom: 0.75,
        left: 1
      }
    },

    resetSpeedsAfterOutOfBounds: false,

    newPositionAfterOutOfBounds: {
      x: 0,
      y: -10
    },
    newPositionAfterFade: {
      x: 0,
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
