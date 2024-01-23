type OutOfBoundsPositioningBehaviours =
  // for example if it goes to bottom it continues at the top
  | "continueOnOtherSide"
  // -- if this is set to true then when out of bound,
  // -- treats it as if firefly is faded
  | "forceFade"
  //  default behaviour, it does nothing
  | "none"
  | "restartAtCenterOfCanvas"
  | "restartAtRandomPosition"
  // set the fixed y position at config outOfBoundsRestartPosition.y
  | "restartAtRandomXPosition"
  // set the fixed x position at config outOfBoundsRestartPosition.x
  | "restartAtRandomYPosition"
  | "restartAtSetPosition"
  // stop at bound
  | "stopAtBound"
