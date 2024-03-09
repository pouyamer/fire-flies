const boundsConfig: BoundsConfigType = {
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
