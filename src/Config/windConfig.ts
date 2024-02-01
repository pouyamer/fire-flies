const windConfig: WindConfigType = {
  speedX: {
    min: -10,
    max: 10
  },
  speedY: {
    min: -10,
    max: 10
  },
  speedResetInterval: 3000,
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
