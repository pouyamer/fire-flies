type OutOfBoundsConfigType = {
  // how the position of new firefly is determined after it gets out of bounds
  // (if bounds are disabled)
  postitioningMethod: OutOfBoundsPositioningMethodType
  // the set values need to fill the position of new firefly after it gets out of bounds
  // for the values not set by the app
  backFillPosition: CartesianCoordinateSystemType

  // after out of bounds, the following values are reset (it gets them again randomly):
  // - speedX and speedY:
  resetSpeeds: boolean
  // - rotation speed:
  resetRotation: boolean
}
