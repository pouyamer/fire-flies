type OutOfBoundsConfigType = {
  // -- position for
  // -- if postitioningAfterOutOfBoundsMethod = set
  backFillPosition: CartesianCoordinateSystemType
  resetSpeeds: boolean

  // what a firefly do after it gets out of bounds
  postitioningMethod: OutOfBoundsPositioningMethodType
}
