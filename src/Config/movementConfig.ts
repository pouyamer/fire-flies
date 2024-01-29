const movementConfig: MovementConfigType = {
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
  }
}
