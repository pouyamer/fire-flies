type BoundsConfigType = {
  toggleBounds: DirectionalBooleanType

  // if true: when a firefly gets out of bounds
  // due to bound disabling

  // how much speed it's going to lose
  afterImpactSpeedMultiplier: DirectionalNumberType
  // how much hue increases after it touches the bounds
  hueIncreaseAmountAfterImpact: DirectionalNumberType

  sizeMultiplierAfterImpact: DirectionalNumberType
}
