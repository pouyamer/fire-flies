type GlowConfigType = {
  // rate (per frame) that a firefly glow (opacity increase)
  rate: RangeType
  resetRateAfterGlow: boolean
  opacityAfterGlow: RangeType
  // if true: the size of firefly gets new random value when a firefly opacity reaches 1
  resetSizeAfterGlow: boolean

  // when Glown gets the color again
  resetColorAfterGlow: boolean

  // it determines what new position fireflies have
  // after fading
  positioningBehaviour: FadeOrGlowPositioningBehaviourType
  sizeChangeBehaviour: {
    behaviorType: FadeOrGlowSizeBehaviorType
    frequency: number
  }
  newPositionAfterGlow: {
    x: number
    y: number
  }
}
