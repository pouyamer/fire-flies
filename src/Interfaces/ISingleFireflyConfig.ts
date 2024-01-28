interface ISingleFireflyConfig {
  x: number
  y: number
  shape: ShapeType
  sideCount: number
  // speed in which firefly moves
  speedX: number
  speedY: number
  accelerationX: number
  accelerationY: number

  angle: number
  rotationSpeed: number
  rotationAcceleration: number

  size: number

  // color of the firefly
  colorValue: IHSLColor

  /* ========================================================================================*/

  opacity: number
  fadeOrGlow: FadeOrGlowType
  // rate of opacity inc or dec
  fadeOrGlowRate: number

  // this firefly is going to be used for debug
  debugMode: boolean

  sizeBehaviourWhenFading: FadeOrGlowSizeBehaviorType
  sizeBehaviourWhenGlowing: FadeOrGlowSizeBehaviorType

  jitterX: number
  jitterY: number
}
