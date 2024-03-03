// Opacity change refers to Fade or Glow in this project
type OpacityChangeConfigType = {
  // rate (per frame) that a firefly fade (or glow)
  rate: RangeType
  // rate of opacity change (fade or glow) will be reset once it fades (or glows)
  // (Set in FadeConfig or GlowConfig )
  resetRateAfterOpacityChange: boolean

  // new initial opacity which is used by newly spawned firefly
  opacityAfterOpacityChange: RangeType

  // if true: the size of firefly gets new random value (set in config file)
  // after a firefly fades (or glows)
  resetSizeAfterOpacityChange: boolean

  // when faded (or glowed) gets the color again (from the values set in ColorValueConfig type)
  resetColorAfterOpacityChange: boolean

  // it determines how the app gets the firefly position
  // after it faded (or glowed)
  positioningMethod: StartingPositioningMethodType

  // it determines how the app gets larger or smaller according to the fade (or glow)
  sizeChange: {
    // grow or shrink
    mode: OpacityChangeSizeChangeModeType
    // how much it grows or shrinks
    frequency: number
  }

  // The positioning System uses this position's value(s) to fill the values not set
  // by the positioningMethod
  backFillPosition: CartesianCoordinateSystemType
}
