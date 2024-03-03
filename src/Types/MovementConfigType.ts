type MovementConfigType = {
  // speed in which firefly moves:
  // Horizontally:
  speedX: RangeType
  // Vertically
  speedY: RangeType

  // rate in which firefly's speed increases:
  // Horizontally:
  accelerationX: RangeType
  // Vertically
  accelerationY: RangeType
  // if true: then accelerates the firefly in current speed direction
  accelerateInCurrentMovingDirection: boolean

  // Jitter: the speed that the fire fly shakes in place:
  // Horizontally:
  jitterCoefficientX: RangeType
  // Vertically
  jitterCoefficientY: RangeType
}
