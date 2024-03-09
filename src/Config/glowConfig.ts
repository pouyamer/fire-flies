const glowConfig: OpacityChangeConfigType = {
  rate: {
    min: 0.003,
    max: 0.009
  },

  opacityAfterOpacityChange: {
    min: 0,
    max: 0
  },
  backFillPosition: {
    x: 0,
    y: 0
  },
  positioningMethod: "none",
  resetColorAfterOpacityChange: false,
  resetRateAfterOpacityChange: false,
  resetSizeAfterOpacityChange: false,
  sizeChange: {
    mode: "none",
    frequency: 1
  }
}
