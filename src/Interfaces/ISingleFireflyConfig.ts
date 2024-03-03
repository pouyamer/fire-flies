// This is the config for a single firefly (get from the main config.fireflies)
interface ISingleFireflyConfig {
  // Position of fireflies
  // - Horizontally
  x: number
  // - Vertically
  y: number

  // Shape of the firefly
  shape: ShapeType

  // if it's a polygon or square how many sides
  sideCount: number
  // Speed in which firefly moves
  // - Horizontally
  speedX: number
  // - Vertically
  speedY: number

  // Rate in which the speed changes:
  // - Horizontally
  accelerationX: number
  // - Vertically
  accelerationY: number

  // Current angle of the firefly (in radians)
  angle: number
  // Speed in which the firefly changes angle (rotates)
  rotationSpeed: number
  // Rate in which the firefly rotates
  rotationAcceleration: number

  // Size of the firefly (in pixels)
  size: number

  // Color of the firefly
  colorValue: HslColorType

  // Opacity and Transparency of the firefly
  opacity: number
  // Determines Firefly fades or glows
  opacityChangeMode: OpacityChangeModeType
  // Rate of the fading or glowing of the firefly
  opacityChangeRate: number

  // if true This firefly is going to be used for debug
  debugMode: boolean

  // Method that size changes when glowed or faded
  sizeBehaviourWhenFading: OpacityChangeSizeChangeModeType
  sizeBehaviourWhenGlowing: OpacityChangeSizeChangeModeType

  // How much the firefly shakes
  // - Horizontally
  jitterX: number
  // - Vertically
  jitterY: number

  // How does the firefly draws the quartercircle if shape is one
  quarterCircleCenterLocation: TwoDimentionalDirectionType

  // EXPERIMENTAL: Wind properties will be set once wind object is created
  // the wind that it is affecting the firefly
  wind: Wind

  // EXPERIMENTAL: how much firefly resists wind [0-1]
  windResistance: number

  // EXPERIMENTAL: how much firefly is affected by wind [0-1]
  windAffectStrength: number
}
