type MovementConfigType = {
  // speed in which firefly moves
  speedX: RangeType
  speedY: RangeType

  // speed in which firefly's speed increases
  accelerationX: RangeType
  accelerationY: RangeType
  accelerateInCurrentMovingDirection: boolean

  // Jitter applies so that the directions
  // gets a bit randomized
  // 0 is for no jitter
  jitterCoefficientX: RangeType
  jitterCoefficientY: RangeType
}
