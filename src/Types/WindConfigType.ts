// EXPERIMENTAL
type WindConfigType = {
  // speed which the wind affects the movements of fireflies
  // - Horizontally
  speedX: RangeType
  // - Vertically
  speedY: RangeType

  // how much the wind resets
  resetInterval: number

  // how does the wind affects all fireflies
  // (strength and speed)
  calculateWindAffectionFunction: (
    sourceX: number,
    sourceY: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => number
}
