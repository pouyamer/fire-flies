const fadeConfig: OpacityChangeConfigType = {
  rate: {
    min: 0.007,
    max: 0.015
  },

  // TODO: change this to new opacity after fade (and grow)
  // TODO: Refactor the code
  opacityAfterOpacityChange: {
    min: 1,
    max: 1
  },
  backFillPosition: {
    x: 0,
    y: 0
  },
  positioningMethod: "randomX",
  resetColorAfterOpacityChange: true,
  resetRateAfterOpacityChange: true,
  resetSizeAfterOpacityChange: true,
  sizeChange: {
    mode: "none",
    frequency: 1
  }
}
