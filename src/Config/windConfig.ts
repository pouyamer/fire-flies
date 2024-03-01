const windConfig: WindConfigType = {
  speedX: {
    min: 0,
    max: 0
  },
  speedY: {
    min: 0,
    max: 0
  },
  speedResetInterval: Infinity,
  calculateWindAffectionFunction: (
    sourceX: number,
    sourceY: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    return (
      (1 - Math.abs(x - sourceX) / width) * (1 - Math.abs(y - sourceY) / height)
    )
  }
}
