class FireFly {
  accelerationX: number
  accelerationY: number
  accelerateInCurrentMovingDirection: boolean
  canvasSize: { width: number; height: number }
  color: IHSLColor
  config: IConfig
  currentOpacity: number
  currentSize: number
  fadeSizeBehavior: FadeSizeBehavior
  maxOpacityDecay: number
  maxSize: number
  minOpacityDecay: number
  minOpacityValue: number
  minSize: number
  modifiedColor: IHSLColor
  opacityDecayAmount: number
  originalOpacity: number
  originalSize: number
  rainbowMode: boolean
  resetDecayAmountWhenFaded: boolean
  resetSizeWhenFaded: boolean
  speedX: number
  speedY: number
  willChangeSize: boolean
  x: number
  y: number
  //speed (based on acceleration)
  modifiedSpeedX: number
  modifiedSpeedY: number

  constructor(x: number, y: number, config: IConfig) {
    this.x = x
    this.y = y
    this.config = config

    // Destructuring the config
    const { fireflies: firefliesConfig } = this.config
    const { min: minOpacityDecay, max: maxOpacityDecay } =
      firefliesConfig.opacityDecay
    const { min: maxSize, max: minSize } = firefliesConfig.size
    const { min: minSpeedX, max: maxSpeedX } = firefliesConfig.speedX
    const { min: minSpeedY, max: maxSpeedY } = firefliesConfig.speedY
    const { accelerationX, accelerationY, accelerateInCurrentMovingDirection } =
      firefliesConfig

    this.accelerationX = accelerationX
    this.accelerationY = accelerationY
    this.accelerateInCurrentMovingDirection = accelerateInCurrentMovingDirection

    this.willChangeSize =
      Math.random() < this.config.fireflies.fadeSizeBehavior.frequency

    this.canvasSize = this.config.canvasSize
    this.rainbowMode = this.config.rainbowMode

    this.minOpacityDecay = minOpacityDecay
    this.maxOpacityDecay = maxOpacityDecay

    this.opacityDecayAmount =
      Math.random() * (maxOpacityDecay - minOpacityDecay) + minOpacityDecay

    this.resetDecayAmountWhenFaded = firefliesConfig.resetDecayAmountWhenFaded

    this.resetSizeWhenFaded = firefliesConfig.resetDecayAmountWhenFaded

    // size gets randomized based on your config
    this.maxSize = maxSize
    this.minSize = minSize

    this.originalSize = Math.random() * (maxSize - minSize) + minSize
    this.currentSize = this.originalSize

    this.fadeSizeBehavior = firefliesConfig.fadeSizeBehavior.behaviorType
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

    this.minOpacityValue = firefliesConfig.minOpacityValue

    this.originalOpacity =
      Math.random() * (1 - this.minOpacityValue) + this.minOpacityValue
    this.currentOpacity = this.originalOpacity

    // initializing the speeds
    this.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX
    this.speedY = Math.random() * (maxSpeedY - minSpeedY) + minSpeedY

    this.modifiedSpeedX = this.speedX
    this.modifiedSpeedY = this.speedY
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

      // resets speed (based on acceleration)
      this.modifiedSpeedX = this.speedX
      this.modifiedSpeedY = this.speedY

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
    this.modifiedColor.h += Math.random() * 3
  }

  update(ctx: CanvasRenderingContext2D) {
    // %, because it gets reset after it reaches the bounds
    this.x = (this.x + this.modifiedSpeedX) % this.canvasSize.width
    this.y = (this.y + this.modifiedSpeedY) % this.canvasSize.height

    // if out of bounds reset position
    // the reason that it is subtracted bt 1 is to not fall into ... % this.canvasSize.width (or height)
    if (this.x <= 0) {
      // --  reset the speed after going out of bounds
      this.x = this.canvasSize.width - 1
    }
    if (this.y <= 0) this.y = this.canvasSize.height - 1

    // increase/decreasing speed of fireflies bt acceleration
    this.modifiedSpeedX +=
      this.accelerationX *
      (this.accelerateInCurrentMovingDirection ? Math.sign(this.speedX) : 1)
    this.modifiedSpeedY +=
      this.accelerationY *
      (this.accelerateInCurrentMovingDirection ? Math.sign(this.speedY) : 1)

    this.draw(ctx)
    this.liveAndDie()

    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }
  }
}
