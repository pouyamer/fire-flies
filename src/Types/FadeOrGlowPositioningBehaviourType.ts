type FadeOrGlowPositioningBehaviourType =
  //  default behaviour, it does nothing
  | "none"
  | "restartAtRandomPosition"
  // set the fixed y position at config fadeRestartPosition.y
  | "restartAtRandomXPosition"
  // set the fixed x position at config fadeRestartPosition.x
  | "restartAtRandomYPosition"
  | "restartAtSetPosition"
  | "restartAtCenterOfCanvas"
