const fadeConfig: OpacityChangeConfigType = {
  rate: {
    min: 0.01,
    max: 0.03
  },

  // TODO: change this to new opacity after fade (and grow)
  // TODO: Refactor the code
  opacityAfterOpacityChange: {
    min: 0,
    max: 1
  },
  backFillPosition: {
    x: 0,
    y: 0
  },
  positioningMethod: "random",
  resetColorAfterOpacityChange: false,
  resetRateAfterOpacityChange: false,
  resetSizeAfterOpacityChange: false,
  sizeChange: {
    mode: "none",
    frequency: 1
  }
}
