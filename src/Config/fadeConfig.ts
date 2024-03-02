const fadeConfig: OpacityChangeConfigType = {
  rate: {
    min: 0.0,
    max: 0.01
  },

  // TODO: change this to new opacity after fade (and grow)
  // TODO: Refactor the code
  opacityAfterOpacityChange: {
    min: 0.5,
    max: 1
  },
  backFillPosition: {
    x: 0,
    y: 0
  },
  positioningMethod: "random",
  resetColorAfterOpacityChange: true,
  resetRateAfterOpacityChange: true,
  resetSizeAfterOpacityChange: true,
  sizeChange: {
    mode: "none",
    frequency: 1
  }
}
