class FireFly {
  constructor(x, y, size, color) {
    this.x = x
    this.y = y
    this.size = size
    // color is an object with hsla values
    this.color = color
    // X and Y Direction is a number between -1 and 1
    // -1 is left, 1 is right
    this.xDirection = Math.random() > 0.5 ? 1 : -1
    this.yDirection = Math.random() > 0.5 ? 1 : -1
    this.opacity = Math.random() * 0.5 + 0.5
  }

  draw() {
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

  liveAndDie() {
    this.opacity -= config.opacityDecay
    if (this.opacity < 0) {
      this.x = Math.random() * size.width
      this.y = Math.random() * size.height
      this.opacity = Math.random() * 0.5 + 0.5
    }
  }

  update() {
    this.x += Math.random() * this.xDirection
    this.y += Math.random() * this.yDirection
    this.draw()
    this.liveAndDie()
  }
}
