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

  opacity: number
  fadeOrGlow: FadeOrGlowType
  // rate of opacity inc or dec
  fadeOrGlowRate: number

  sizeBehaviourWhenFading: FadeOrGlowSizeBehaviorType
  sizeBehaviourWhenGlowing: FadeOrGlowSizeBehaviorType

  jitterX: number
  jitterY: number
}
