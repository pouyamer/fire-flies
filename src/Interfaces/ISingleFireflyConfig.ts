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
  opacityChangeMode: OpacityChangeModeType
  // rate of opacity inc or dec
  opacityChangeRate: number

  // this firefly is going to be used for debug
  debugMode: boolean

  sizeBehaviourWhenFading: OpacityChangeSizeChangeModeType
  sizeBehaviourWhenGlowing: OpacityChangeSizeChangeModeType

  jitterX: number
  jitterY: number

  quarterCircleCenterLocation: TwoDimentionalDirectionType

  // wind properties will be set once wind object is created
  wind: Wind

  // how much firefly resists wind [0-1]
  windResistance: number

  // how much firefly is affected by wind [0-1]
  windAffectStrength: number
}
