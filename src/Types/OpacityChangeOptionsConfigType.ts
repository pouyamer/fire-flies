// The Config for fade and glow respectively
type OpacityChangeOptionsConfigType = {
  // how many of fireflies are going to fade (others will glow)
  fadeRatio: number

  // config for fade
  fade: OpacityChangeConfigType

  // config for glow
  glow: OpacityChangeConfigType
}
