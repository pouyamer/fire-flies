type OpacityChangeConfigType = {
  // rate (per frame) that a firefly fade (or glow)
  rate: RangeType
  resetRateAfterOpacityChange: boolean
  opacityAfterOpacityChange: RangeType
  // if true: the size of firefly gets new random value when a firefly opacity reaches zero
  resetSizeAfterOpacityChange: boolean

  // when faded gets the color again
  resetColorAfterOpacityChange: boolean

  // it determines what new position fireflies have
  // after fading (or glowing)
  positioningMethod: StartingPositioningMethodType
  sizeChange: {
    mode: OpacityChangeSizeChangeModeType
    frequency: number
  }
  backFillPosition: CartesianCoordinateSystemType
}
