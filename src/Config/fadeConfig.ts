const fadeConfig: FadeConfigType = {
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
}
