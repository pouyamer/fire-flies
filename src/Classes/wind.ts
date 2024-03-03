class Wind {
  windConfig: WindConfigType
  config
  constructor(windConfig: WindConfigType) {
    this.windConfig = windConfig
    this.config = {
      speedX: this.utilGetRandomNumberBetween(windConfig.speedX),
      speedY: this.utilGetRandomNumberBetween(windConfig.speedY),
      sourceX: this.utilGetRandomNumberBetween({
        min: 0,
        max: config.canvasSize.width
      }),
      sourceY: this.utilGetRandomNumberBetween({
        min: 0,
        max: config.canvasSize.height
      })
    }

    this.updateWind()
  }

  utilGetRandomNumberBetween = (
    range: RangeType,
    getAsInteger: boolean = false
  ) => {
    const { min, max } = range
    return getAsInteger
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.random() * (max - min) + min
  }

  affectFirefly(firefly: FireFly, strength: number = 1) {
    firefly.config.wind = this
    firefly.config.windAffectStrength = strength
  }

  updateWind() {
    setInterval(() => {
      this.config.sourceX = this.utilGetRandomNumberBetween({
        min: 0,
        max: config.canvasSize.width
      })

      this.config.sourceY = this.utilGetRandomNumberBetween({
        min: 0,
        max: config.canvasSize.height
      })

      this.config.speedX = this.utilGetRandomNumberBetween(
        this.windConfig.speedX
      )
      this.config.speedY = this.utilGetRandomNumberBetween(
        this.windConfig.speedY
      )
    }, this.windConfig.resetInterval)
  }
}
