interface ISingleFireflyConfig {
  // speed in which firefly moves
  speedX: number
  speedY: number

  // speed in which firefly's speed increases
  accelerationX: number
  accelerationY: number
  accelerateInCurrentMovingDirection: boolean

  size: number

  // if true: the size of firefly gets new random value when a firefly opacity reaches zero
  resetSizeWhenFaded: boolean

  // color of the firefly
  colorValue: IHSLColor

  // when faded gets the color again
  resetColorWhenFaded: boolean

  /* ========================================================================================*/

  // rate of opacity decay
  opacity: number
  opacityDecay: number

  // if true: the decayAmount gets new random value when a firefly opacity reaches zero
  resetDecayAmountWhenFaded: boolean

  fadeSizeBehaviorType: FadeSizeBehavior
  willChangeSize: boolean
}
