const glowConfig: GlowConfigType = {
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
}
