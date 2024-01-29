type StartingPositioningMethodType =
  | "random"
  // set the fixed y position at config backFillPosition.y
  | "randomX"
  // set the fixed x position at config backFillPosition.x
  | "randomY"
  | "set"
  | "centerOfCanvas"
