const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { canvasSize } = config

canvas.width = canvasSize.width
canvas.height = canvasSize.height

const hslStringify = (h, s, l, a = 1) => `hsl(${h}, ${s}%, ${l}%, ${a})`

const fireflies = []

const { min, max } = config.fireflies.size
const { min: minSpeed, max: maxSpeed } = config.fireflies.speed

for (let i = 0; i < config.fireflies.number; i++) {
  fireflies.push(
    new FireFly(
      Math.random() * canvasSize.width,
      Math.random() * canvasSize.height,
      Math.random() * (max - min) + min,
      {
        h: config.fireflies.color.h,
        s: config.fireflies.color.s,
        l: config.fireflies.color.l,
        a: config.fireflies.color.a
      },
      Math.random() * (maxSpeed - minSpeed) + minSpeed,
      config.rainbowMode
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
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

  // Fireflies
  fireflies.forEach(firefly => firefly.update())

  // requestAnimationFrame causes the browser to call the function again and again
  requestAnimationFrame(render)
}

// App Starts here...
render()
