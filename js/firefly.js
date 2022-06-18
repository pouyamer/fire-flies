class FireFly {
  constructor(x, y, size, color, speed, rainbowMode) {
    this.x = x
    this.y = y
    this.size = size
    // color is an object with hsla values
    this.color = color
    // X and Y Direction is a number between -1 and 1
    // -1 is left or up, 1 is right or down, 0 is stationary in that axis
    this.xDirection = this.determineDirection()
    this.yDirection = this.determineDirection()

    this.opacity = Math.random() * 0.5 + 0.5
    this.speed = speed
    this.rainbowMode = rainbowMode
  }

  // Determine the direction of the firefly (X-wise or Y-wise)
  determineDirection = () => {
    const direction = Math.random()
    if (direction < 0.44) return -1
    if (direction < 0.88) return 1
    if (direction < 1) return 0
  }

  draw = () => {
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
    this.opacity -= config.opacityDecay
    if (this.opacity < 0) {
      this.x = Math.random() * canvasSize.width
      this.y = Math.random() * canvasSize.height
      this.xDirection = this.determineDirection()
      this.yDirection = this.determineDirection()
      this.opacity = Math.random() * 0.5 + 0.5
    }
  }

  somewhereOverTheRainbow = () => {
    if (this.rainbowMode) {
      this.color.h += Math.random() * 3 + 1
    }
  }

  update() {
    this.x += this.speed * Math.random() * this.xDirection
    this.y += this.speed * Math.random() * this.yDirection
    this.draw()
    this.liveAndDie()
    this.somewhereOverTheRainbow()
  }
}
