class FireFly {
  config: IConfig
  x: number
  y: number
  canvasSize: { width: number; height: number }
  rainbowMode: boolean
  minOpacityDecay: number
  maxOpacityDecay: number
  opacityDecayAmount: number
  resetDecayAmountWhenFaded: boolean
  resetSizeWhenFaded: boolean
  maxSize: number
  minSize: number
  originalSize: number
  currentSize: number
  color: IHSLColor
  originalOpacity: number
  currentOpacity: number
  speedX: number
  speedY: number
  fadeSizeBehavior: FadeSizeBehavior
  willChangeSize: boolean
  minOpacityValue: number
  modifiedColor: IHSLColor

  constructor(x: number, y: number, config: IConfig) {
    this.x = x
    this.y = y
    this.config = config

    this.willChangeSize =
      Math.random() < this.config.fireflies.fadeSizeBehavior.frequency

    const { fireflies: firefliesConfig } = this.config

    this.canvasSize = this.config.canvasSize
    this.rainbowMode = this.config.rainbowMode
    const { min: minOpacityDecay, max: maxOpacityDecay } =
      firefliesConfig.opacityDecay

    this.minOpacityDecay = minOpacityDecay
    this.maxOpacityDecay = maxOpacityDecay

    this.opacityDecayAmount =
      Math.random() * (maxOpacityDecay - minOpacityDecay) + minOpacityDecay

    this.resetDecayAmountWhenFaded = firefliesConfig.resetDecayAmountWhenFaded

    this.resetSizeWhenFaded = firefliesConfig.resetDecayAmountWhenFaded

    // size gets randomized based on your config
    const { min: maxSize, max: minSize } = firefliesConfig.size

    this.maxSize = maxSize
    this.minSize = minSize

    this.originalSize = Math.random() * (maxSize - minSize) + minSize
    this.currentSize = this.originalSize

    this.fadeSizeBehavior = this.config.fireflies.fadeSizeBehavior.behaviorType
    // color is an object with hsla values

    //  original color before all applies
    this.color = {
      h: firefliesConfig.color.h,
      s: firefliesConfig.color.s,
      l: firefliesConfig.color.l,
      a: firefliesConfig.color.a
    }

    this.modifiedColor = {
      h: this.config.rainbowMode
        ? Math.random() * 360
        : firefliesConfig.color.h,
      s: firefliesConfig.color.s,
      l: firefliesConfig.color.l,
      a: firefliesConfig.color.a
    }

    /* TEST: 
    // X and Y Direction is a number between -1 and 1
    // -1 is left or up, 1 is right or down, 0 is stationary in that axis
    this.xDirection = this.determineDirection()
    this.yDirection = this.determineDirection()
*/
    this.minOpacityValue = this.config.fireflies.minOpacityValue

    this.originalOpacity =
      Math.random() * (1 - this.minOpacityValue) + this.minOpacityValue
    this.currentOpacity = this.originalOpacity

    const { min: minSpeedX, max: maxSpeedX } = firefliesConfig.speedX
    const { min: minSpeedY, max: maxSpeedY } = firefliesConfig.speedY

    this.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX
    this.speedY = Math.random() * (maxSpeedY - minSpeedY) + minSpeedY
  }

  // Determine the direction of the firefly (X-wise or Y-wise)
  // For X, -1:left, 1:right
  // For Y: -1:up, 1:down
  // For X and Y: 0:not moving in that direction

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.currentSize, 0, 2 * Math.PI)
    ctx.fillStyle = hslStringify(
      this.modifiedColor.h,
      this.modifiedColor.s,
      this.modifiedColor.l,
      this.currentOpacity
    )

    ctx.fill()
  }

  // liveAndDie() lowers the opacity of the firefly
  // if it reaches 0, it is moved to a random location
  // and its opacity is reset to a random value (> 0.5)
  liveAndDie = () => {
    this.currentOpacity = Math.max(
      this.currentOpacity - this.opacityDecayAmount,
      0
    )

    if (this.fadeSizeBehavior === "shrink" && this.willChangeSize)
      this.currentSize = this.currentOpacity * this.originalSize

    if (this.fadeSizeBehavior === "grow" && this.willChangeSize) {
      this.currentSize = (1 - this.currentOpacity) * this.originalSize
    }

    if (this.currentOpacity === 0) {
      this.x = Math.random() * this.canvasSize.width
      this.y = Math.random() * this.canvasSize.height

      // resetting the opacity
      this.originalOpacity =
        Math.random() * (1 - this.minOpacityValue) + this.minOpacityValue
      this.currentOpacity = this.originalOpacity

      if (this.fadeSizeBehavior === "shrink" && this.willChangeSize) {
        this.currentSize = this.originalSize
        this.currentSize = this.currentOpacity * this.originalSize
      }

      if (this.fadeSizeBehavior === "grow" && this.willChangeSize) {
        this.currentSize = this.originalSize
        this.currentSize = (1 - this.currentOpacity) * this.originalSize
      }

      if (this.resetDecayAmountWhenFaded) {
        this.opacityDecayAmount =
          Math.random() * (this.maxOpacityDecay - this.minOpacityDecay) +
          this.minOpacityDecay
      }

      if (this.resetSizeWhenFaded) {
        this.currentSize =
          Math.random() * (this.maxSize - this.minSize) + this.minSize
      }
    }
  }

  somewhereOverTheRainbow = () => {
    this.modifiedColor.h += 2
  }

  update(ctx: CanvasRenderingContext2D) {
    this.x += this.speedX
    this.y += this.speedY

    this.draw(ctx)
    this.liveAndDie()

    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }
  }
}
