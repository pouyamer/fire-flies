const boundsConfig: BoundsConfigType = {
  toggleBounds: {
    top: true,
    right: true,
    bottom: true,
    left: true
  },
  afterImpactSpeedMultiplier: {
    top: 0.8,
    right: 0.8,
    bottom: 0.8,
    left: 0.8
  },
  hueIncreaseAmountAfterImpact: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  sizeMultiplierAfterImpact: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  rotationSpeedMultiplierAfterImpact: {
    left: -1,
    right: -1,
    top: -1,
    bottom: -1
  },

  accelerationXRegenrationAfterImpact: {
    top: false,
    right: true,
    bottom: false,
    left: true
  },

  accelerationYRegenrationAfterImpact: {
    top: true,
    right: false,
    bottom: true,
    left: false
  },

  changeSizeToMinAfterHitMaxSize: true
}
