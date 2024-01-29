type RotationConfigType = {
  //  starting Angle
  startingAngle: number
  //  if true, starting angle will be randomized
  //  ignores startingAngle
  startAngleOnRandom: boolean
  //  rate (radian) of rotation per frame
  speed: RangeType
  //  rate of rotation speed change
  acceleration: RangeType
}
