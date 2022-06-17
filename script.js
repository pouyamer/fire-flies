const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const size = { width: innerWidth, height: innerHeight }
canvas.width = size.width
canvas.height = size.height

const hslStringify = (h, s, l, a = 1) => `hsl(${h}, ${s}%, ${l}%, ${a})`

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
