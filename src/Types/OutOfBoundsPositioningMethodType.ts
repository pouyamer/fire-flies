// Methods used for getting the firefly's new location after it gets out of bounds
type OutOfBoundsPositioningMethodType =
  // if fireflies get out of bounds, they will continue from the other side (the opposite direction)
  // e.g. if fireflies got out of bounds from the left bound, they will continue from the right bound, and so on
  | "continueOnOtherSide"
  // when fireflies gets out of bound, treats it as if fireflies are faded (gets from fadeConfig)
  | "forceFade"
  //  Fireflies continues their journey into the oblivion :D (not recommended)
  | "none"
  // Fireflies respawn at the center of canvas
  | "centerOfCanvas"
  // Fireflies respawn at random positions on canvas
  | "random"
  // Fireflies respawn at positions w/ random x value
  // set the y value of the position in backFillPosition (set in OutOfBoundsConfig)
  | "randomX"
  // Fireflies respawn at positions w/ random y value
  // set the x value of the position in backFillPosition (set in OutOfBoundsConfig)
  | "randomY"
  // Fireflies respawn at a fixed set position
  //   the backFillPosition (set in OutOfBoundsConfig)
  | "set"
