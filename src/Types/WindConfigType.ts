type WindConfigType = {
  speedX: RangeType
  speedY: RangeType
  speedResetInterval: number
  calculateWindAffectionFunction: (
    sourceX: number,
    sourceY: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => number
}
