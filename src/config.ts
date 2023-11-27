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
    number: 100,

    speedX: {
      min: -2,
      max: 3
    },
    speedY: {
      min: -1,
      max: 0
    },

    accelerationX: 0,
    accelerationY: 0,
    accelerateInCurrentMovingDirection: false,

    jitterCoefficientX: {
      min: 0,
      max: 2
    },
    jitterCoefficientY: {
      min: 0,
      max: 2
    },

    size: {
      min: 3,
      max: 7
    },

    coloringMode: "singleColor",

    singleColorValue: {
      h: 75,
      s: 85,
      l: 75,
      a: 1
    },

    hueRangeSpecification: {
      min: 100,
      max: 200
    },

    saturationRangeSpecification: {
      min: 20,
      max: 100
    },

    lightnessRangeSpecification: {
      min: 60,
      max: 100
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

    fadeRate: {
      min: 0.01,
      max: 0.04
    },

    resetColorAfterFade: true,
    resetSizeAfterFade: true,
    resetFadeRateAfterFade: true,

    outOfBoundsPositioningBehaviour: "continueOnOtherSide",
    fadePositioningBehaviour: "restartAtRandomPosition",

    resetSpeedsAfterOutOfBounds: true,

    newPositionAfterOutOfBounds: {
      x: 0,
      y: -10
    },
    newPositionAfterFade: {
      x: innerWidth / 2,
      y: innerHeight
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
