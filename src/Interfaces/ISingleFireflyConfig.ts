interface ISingleFireflyConfig {
  shape: ShapeType
  // speed in which firefly moves
  speedX: number
  speedY: number
  accelerationX: number
  accelerationY: number

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
