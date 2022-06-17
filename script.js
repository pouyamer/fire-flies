const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const size = { width: innerWidth, height: innerHeight }
canvas.width = size.width
canvas.height = size.height

const config = {
  opacityDecay: 0.01,
  skyColor: {
    h: 242,
    s: 100,
    l: 3,
    a: 1
  },
  fireflies: {
    number: 100,
    size: {
      min: 4,
      max: 12
    },
    color: {
      h: 70,
      s: 100,
      l: 79,
      a: 1
    }
  }
}

const hslStringify = (h, s, l, a = 1) => `hsl(${h}, ${s}%, ${l}%, ${a})`

class FireFly {
  constructor(x, y, size, color) {
    this.x = x
    this.y = y
    this.size = size
    // color is an object with hsla values
    this.color = color
    this.direction = Math.random() > 0.5 ? 1 : -1
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
    this.x += Math.random() * this.direction
    this.y += Math.random() * this.direction
    this.draw()
    this.liveAndDie()
  }
}

const fireflies = []

const { min, max } = config.fireflies.size

for (let i = 0; i < config.fireflies.number; i++) {
  fireflies.push(
    new FireFly(
      Math.random() * size.width,
      Math.random() * size.height,
      Math.random() * (max - min) + min,
      config.fireflies.color
    )
  )
}

const render = () => {
  // Sky
  ctx.fillStyle = hslStringify(
    config.skyColor.h,
    config.skyColor.s,
    config.skyColor.l,
    config.skyColor.a
  )
  ctx.fillRect(0, 0, size.width, size.height)

  // Fireflies
  fireflies.forEach(firefly => firefly.update())

  // requestAnimationFrame causes the browser to call the function again and again
  requestAnimationFrame(render)
}

// App Starts here...
render()
