// rotation is when fireflies rotate (does not affect the circle shape)
type RotationConfigType = {
  //  starting Angle that fireflies are spawned with (in radian)
  startingAngle: number
  //  if true, starting angle will be randomized at the start of the app
  //  (Note: this setting ignores the set value of startingAngle)
  startAngleOnRandom: boolean
  //  rate of rotation (in radian) per iteration
  speed: RangeType
  //  rate in which the rotation speed changes per iteration (in radian)
  acceleration: RangeType
}
