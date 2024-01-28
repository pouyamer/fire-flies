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
    count: 300,
    shape: "regularPolygram",
    size: {
      min: 4,
      max: 50
    },

    speedX: {
      min: 0,
      max: 0
    },
    speedY: {
      min: 0,
      max: 0
    },

    accelerationX: {
      min: -0.05,
      max: 0.05
    },
    accelerationY: {
      min: 0.1,
      max: 0.3
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
      min: 0.01,
      max: 0.1
    },
    rotationAcceleration: {
      min: 0.0001,
      max: 0.0002
    },

    startAngleOnRandom: false,

    regularPolygon: {
      sideCount: {
        min: 5,
        max: 5
      }
    },
    fadeRatio: 1,

    fade: {
      rate: {
        min: 0.0025,
        max: 0.005
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
      resetSizeAfterFade: true,
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
        behaviorType: "grow",
        frequency: 1
      }
    },
    colorValueUpdate: {
      mode: "updatingHslColor",
      startingMehtod: "random",
      onFadeMethod: "random",
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
      min: 0,
      max: 120
    },

    saturationRangeSpecification: {
      min: 40,
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
        min: 40,
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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
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
