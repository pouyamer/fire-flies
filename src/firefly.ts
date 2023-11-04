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
  xDirection: number
  yDirection: number
  originalOpacity: number
  currentOpacity: number
  speed: number
  fadeSizeBehavior: FadeSizeBehavior
  willChangeSize: boolean
  minOpacityValue: number

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
    this.color = {
      h: this.config.rainbowMode
        ? Math.random() * 360
        : firefliesConfig.color.h,
      s: firefliesConfig.color.s,
      l: firefliesConfig.color.l,
      a: firefliesConfig.color.a
    }
    // X and Y Direction is a number between -1 and 1
    // -1 is left or up, 1 is right or down, 0 is stationary in that axis
    this.xDirection = this.determineDirection()
    this.yDirection = this.determineDirection()

    this.minOpacityValue = this.config.fireflies.minOpacityValue

    this.originalOpacity =
      Math.random() * (1 - this.minOpacityValue) + this.minOpacityValue
    this.currentOpacity = this.originalOpacity

    const { min: minSpeed, max: maxSpeed } = firefliesConfig.speed
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed

    console.log(this.currentOpacity)
  }

  // Determine the direction of the firefly (X-wise or Y-wise)
  // For X, -1:left, 1:right
  // For Y: -1:up, 1:down
  // For X and Y: 0:not moving in that direction

  determineDirection = (): number => {
    const direction: number = Math.random()
    if (direction < 0.44) return -1
    if (direction < 0.88) return 1
    if (direction < 1) return 0
    return 0
  }

  // if X is not moving Y should move, so it doesn't stay still and die sadly :(
  determineDirectionIfXisNotMoving = () => (Math.random() < 0.5 ? 1 : -1)

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.currentSize, 0, 2 * Math.PI)
    ctx.fillStyle = hslStringify(
      this.color.h,
      this.color.s,
      this.color.l,
      this.currentOpacity
    )

    console.log(
      hslStringify(
        this.color.h,
        this.color.s,
        this.color.l,
        this.currentOpacity
      )
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
      this.xDirection = this.determineDirection()

      this.yDirection =
        this.xDirection === 0
          ? this.determineDirectionIfXisNotMoving()
          : this.determineDirection()

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
    this.color.h += 2
  }

  update(ctx: CanvasRenderingContext2D) {
    this.x += this.speed * Math.random() * this.xDirection
    this.y += this.speed * Math.random() * this.yDirection
    this.draw(ctx)
    this.liveAndDie()

    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }
  }
}
