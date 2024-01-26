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
    number: 200,
    shape: "circle",
    size: {
      min: 1,
      max: 100
    },

    speedX: {
      min: -5,
      max: 5
    },
    speedY: {
      min: -5,
      max: 5
    },

    accelerationX: {
      min: 0,
      max: 0
    },
    accelerationY: {
      min: 0,
      max: 0
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
      mode: "singleColor",
      startingMehtod: "min",
      onFadeMethod: "max",
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
      min: 0,
      max: 100
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
      min: 0,
      max: 0
      // min: 0,
      // max: 0
    },

    resetColorAfterFade: true,
    resetSizeAfterFade: false,
    resetFadeRateAfterFade: true,

    outOfBoundsPositioningBehaviour: "continueOnOtherSide",
    fadePositioningBehaviour: "none",

    bounds: {
      toggleBounds: {
        top: true,
        right: true,
        bottom: true,
        left: true
      },
      afterImpactSpeedMultiplier: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      },
      hueIncreaseAmountAfterImpact: {
        left: 1,
        right: 1,
        top: 1,
        bottom: 1
      },
      sizeMultiplierAfterImpact: {
        top: 0.95,
        right: 0.95,
        bottom: 0.95,
        left: 0.95
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
