interface ISingleFireflyConfig {
  // speed in which firefly moves
  speedX: number
  speedY: number

  size: number

  // color of the firefly
  colorValue: IHSLColor

  /* ========================================================================================*/

  // rate of opacity decay
  opacity: number
  fadeRate: number

  sizeBehaviourWhenFading: FadeSizeBehavior
  willChangeSize: boolean

  jitterX: number
  jitterY: number
}
