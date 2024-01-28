type FadeConfigType = {
  // rate (per frame) that a firefly fade (opacity decay)
  rate: RangeType
  resetRateAfterFade: boolean
  opacityAfterFade: RangeType
  // if true: the size of firefly gets new random value when a firefly opacity reaches zero
  resetSizeAfterFade: boolean

  // when faded gets the color again
  resetColorAfterFade: boolean

  // it determines what new position fireflies have
  // after fading
  positioningBehaviour: FadeOrGlowPositioningBehaviourType
  sizeChangeBehaviour: {
    behaviorType: FadeOrGlowSizeBehaviorType
    frequency: number
  }
  newPositionAfterFade: {
    x: number
    y: number
  }
}
