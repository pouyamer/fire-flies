class FireFly {
  constructor(x, y, config) {
    this.x = x
    this.y = y
    this.config = config
    this.canvasSize = this.config.canvasSize
    this.rainbowMode = this.config.rainbowMode
    const { min: minOpacityDecay, max: maxOpacityDecay } =
      this.config.fireflies.opacityDecay

    this.minOpacityDecay = minOpacityDecay
    this.maxOpacityDecay = maxOpacityDecay

    this.opacityDecayAmount =
      Math.random() * (maxOpacityDecay - minOpacityDecay) + minOpacityDecay

    console.log(this.opacityDecayAmount)

    this.resetDecayAmountWhenFaded =
      this.config.fireflies.resetDecayAmountWhenFaded

    this.resetSizeWhenFaded = this.config.fireflies.resetDecayAmountWhenFaded

    // size gets randomized based on your config
    const { min: maxSize, max: minSize } = this.config.fireflies.size

    this.maxSize = maxSize
    this.minSize = minSize

    this.size = Math.random() * (maxSize - minSize) + minSize

    // color is an object with hsla values
    this.color = {
      h: this.config.rainbowMode
        ? Math.random() * 360
        : this.config.fireflies.color.h,
      s: this.config.fireflies.color.s,
      l: this.config.fireflies.color.l,
      a: this.config.fireflies.color.a
    }
    // X and Y Direction is a number between -1 and 1
    // -1 is left or up, 1 is right or down, 0 is stationary in that axis
    this.xDirection = this.determineDirection()
    this.yDirection = this.determineDirection()

    this.opacity = Math.random() * 0.5 + 0.5

    const { min: minSpeed, max: maxSpeed } = this.config.fireflies.speed
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed
  }

  // Determine the direction of the firefly (X-wise or Y-wise)
  // For X, -1:left, 1:right
  // For Y: -1:up, 1:down
  // For X and Y: 0:not moving in that direction

  determineDirection = () => {
    const direction = Math.random()
    if (direction < 0.44) return -1
    if (direction < 0.88) return 1
    if (direction < 1) return 0
  }
  // if X is not moving Y should move, so it doesn't stay still and die sadly :(
  determineDirectionIfXisNotMoving = () => (Math.random() < 0.5 ? 1 : -1)

  draw = ctx => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fillStyle = hslStringify(
      this.color.h,
      this.color.s,
      this.color.l,
      this.opacity
    )
    ctx.fill()
  }

  // liveAndDie() lowers the opacity of the firefly
  // if it reaches 0, it is moved to a random location
  // and its opacity is reset to a random value (> 0.5)
  liveAndDie = () => {
    this.opacity -= this.opacityDecayAmount

    if (this.opacity < 0) {
      this.x = Math.random() * this.canvasSize.width
      this.y = Math.random() * this.canvasSize.height
      this.xDirection = this.determineDirection()

      this.yDirection =
        this.xDirection === 0
          ? this.determineDirectionIfXisNotMoving()
          : this.determineDirection()

      this.opacity = Math.random() * 0.5 + 0.5

      if (this.resetDecayAmountWhenFaded) {
        this.opacityDecayAmount =
          Math.random() * (this.maxOpacityDecay - this.minOpacityDecay) +
          this.minOpacityDecay
      }

      if (this.resetSizeWhenFaded) {
        this.size = Math.random() * (this.maxSize - this.minSize) + this.minSize
      }
    }
  }

  somewhereOverTheRainbow = () => {
    if (this.rainbowMode) {
      this.color.h += Math.random() * 3 + 1
    }
  }

  update(ctx) {
    this.x += this.speed * Math.random() * this.xDirection
    this.y += this.speed * Math.random() * this.yDirection
    this.draw(ctx)
    this.liveAndDie()
    this.somewhereOverTheRainbow()
  }
}
