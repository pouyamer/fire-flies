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
    count: 1000,
    shape: "square",
    size: {
      min: 4,
      max: 20
    },

    speedX: {
      min: -2,
      max: 2
    },
    speedY: {
      min: -2,
      max: 2
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
      min: -1,
      max: 1
    },
    jitterCoefficientY: {
      min: -1,
      max: 1
    },
    startingAngle: 0,
    rotationSpeed: {
      min: 0.1,
      max: 0.3
    },
    startAngleOnRandom: false,
    fadeRatio: 1,

    fade: {
      rate: {
        min: 0,
        max: 0
      },

      // TODO: change this to new opacity after fade (and grow)
      // TODO: Refactor the code
      opacityAfterFade: {
        min: 1,
        max: 1
      },
      newPositionAfterFade: {
        x: 0,
        y: 0
      },
      positioningBehaviour: "restartAtRandomPosition",
      resetColorAfterFade: true,
      resetRateAfterFade: true,
      resetSizeAfterFade: false,
      sizeChangeBehaviour: {
        behaviorType: "none",
        frequency: 1
      }
    },

    glow: {
      rate: {
        min: 0.003,
        max: 0.012
      },

      opacityAfterGlow: {
        min: 0,
        max: 0
      },
      newPositionAfterGlow: {
        x: 0,
        y: 0
      },
      positioningBehaviour: "restartAtRandomPosition",
      resetColorAfterGlow: true,
      resetRateAfterGlow: true,
      resetSizeAfterGlow: false,
      sizeChangeBehaviour: {
        behaviorType: "none",
        frequency: 1
      }
    },
    colorValueUpdate: {
      mode: "updatingHue",
      startingMehtod: "max",
      onFadeMethod: "decreasing",
      increasingOrDecreasingOnFade: 10,
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
      l: 65,
      a: 1
    },

    hueRangeSpecification: {
      min: 20,
      max: 50
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

    outOfBoundsPositioningBehaviour: "forceFade",

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
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      }
    },

    resetSpeedsAfterOutOfBounds: false,

    newPositionAfterOutOfBounds: {
      x: 0,
      y: -10
    },

    hueShiftMode: "onArrowKeys"
  }
}
