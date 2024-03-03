type StartingPositioningConfigType = {
  // Method that determines where the fireflies spawn when the app starts running
  method: StartingPositioningMethodType

  // the set values need to fill the position of firefly when app starts running
  // for the values not set by the app
  backFillPosition: CartesianCoordinateSystemType
}
