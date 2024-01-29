const glowConfig: OpacityChangeConfigType = {
  rate: {
    min: 0.003,
    max: 0.012
  },

  opacityAfterOpacityChange: {
    min: 0,
    max: 0
  },
  backFillPosition: {
    x: 0,
    y: 0
  },
  positioningMethod: "random",
  resetColorAfterOpacityChange: true,
  resetRateAfterOpacityChange: true,
  resetSizeAfterOpacityChange: false,
  sizeChange: {
    mode: "grow",
    frequency: 1
  }
}
