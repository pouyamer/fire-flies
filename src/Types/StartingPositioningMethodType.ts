type StartingPositioningMethodType =
  // Fireflies spawn at random positions on canvas
  | "random"
  // Fireflies spawn at positions w/ random x value
  // set the y value of the position in backFillPosition (set in StartingPositioningConfig)
  | "randomX"
  // Fireflies spawn at positions w/ random y value
  // set the x value of the position in backFillPosition (set in StartingPositioningConfig)
  | "randomY"
  // Fireflies spawn at a fixed set position:
  // the backFillPosition (set in StartingPositioningConfig)
  | "set"
  // Fireflies spawn at the center of canvas
  | "centerOfCanvas"
