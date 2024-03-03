type BoundsConfigType = {
  // if true: when a firefly gets out of bounds
  // due to bound disabling
  toggleBounds: DirectionalBooleanType

  // Impact: when a firefly has hit the wall, it is called an impact

  // how much speed it's going to lose after it hit the bounds
  afterImpactSpeedMultiplier: DirectionalNumberType
  // how much hue increases after it hit the bounds
  hueIncreaseAmountAfterImpact: DirectionalNumberType
  // how much rotation speed it's going to lose after it hit the bounds
  rotationSpeedMultiplierAfterImpact: DirectionalNumberType
  // how much the size grows or shrink iwhen it hit the wall
  sizeMultiplierAfterImpact: DirectionalNumberType
  //   -After the impact: if it reaches the max size (defined in config file) it would reset to min size (defined in config file)
  changeSizeToMinAfterHitMaxSize: boolean

  // if acceleration should be regenrated (get the acc values on random between:
  //  -accX and accY max and min (defined in config file)
  accelerationXRegenrationAfterImpact: DirectionalBooleanType
  accelerationYRegenrationAfterImpact: DirectionalBooleanType
}
