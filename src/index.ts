const hslStringify = (h: number, s: number, l: number, a: number = 1) =>
  `hsl(${h}, ${s}%, ${l}%, ${a})`

const isObject = (item: object) =>
  item && typeof item === "object" && !Array.isArray(item)

const deepMerge = (target: any, source: any) => {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = deepMerge(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

const createCanvasElement = () => {
  // <canvas class="canvas">Your Browser doesn't support HTML Canvas :(</canvas>
  const canvasElement = document.createElement("canvas")
  canvasElement.classList.add("firefly-canvas")
  canvasElement.innerText = "Your Browser doesn't support HTML Canvas"
  return canvasElement
}

const addCanvas = (
  parentElement = document.querySelector("body") as HTMLElement,
  positionedInElement = true,
  desiredConfig = {}
) => {
  const finalConfig = deepMerge(config, desiredConfig)
  const { canvasSize } = finalConfig

  const firefliesCanvas = createCanvasElement()
  const ctx = firefliesCanvas.getContext("2d") as CanvasRenderingContext2D
  parentElement.appendChild(firefliesCanvas)

  // css reset applies here
  firefliesCanvas.style.display = "block"

  // Note: position: relative gets applied to the parentElement
  if (!positionedInElement) {
    firefliesCanvas.width = canvasSize.width
    firefliesCanvas.height = canvasSize.height
  } else {
    parentElement.style.position = "relative"
    firefliesCanvas.style.position = "absolute"
    firefliesCanvas.style.left = "0"
    firefliesCanvas.style.top = "0"

    firefliesCanvas.style.width = "100%"
    firefliesCanvas.style.height = "100%"

    // setting canvas width and height to those of parentElement's
    finalConfig.canvasSize.width =
      getComputedStyle(parentElement).width.split("px")[0]
    finalConfig.canvasSize.height =
      getComputedStyle(parentElement).height.split("px")[0]

    // -- Reiniatiating the canvas
    firefliesCanvas.width = canvasSize.width
    firefliesCanvas.height = canvasSize.height
  }

  console.log({ finalConfig })

  let fireflies: FireFly[] = []

  // creating fireflies based on finalConfig
  for (let i = 0; i < finalConfig.fireflies.number; i++) {
    fireflies.push(
      new FireFly(
        Math.random() * canvasSize.width,
        Math.random() * canvasSize.height,
        finalConfig
      )
    )

    // get the sizes right, when window gets resized:

    window.addEventListener("resize", () => {
      // setting canvas width and height to those of parentElement's
      finalConfig.canvasSize.width =
        getComputedStyle(parentElement).width.split("px")[0]
      finalConfig.canvasSize.height =
        getComputedStyle(parentElement).height.split("px")[0]
      // -- Reiniatiating the canvas
      firefliesCanvas.width = canvasSize.width
      firefliesCanvas.height = canvasSize.height
    })
  }

  console.log(fireflies)

  const render = () => {
    // Sky
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    ctx.fillStyle = hslStringify(
      finalConfig.skyColor.h,
      finalConfig.skyColor.s,
      finalConfig.skyColor.l,
      finalConfig.skyColor.a
    )
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

    // Fireflies
    fireflies.forEach(firefly => firefly.update(ctx))

    // requestAnimationFrame causes the browser to call the function again and again
    requestAnimationFrame(render)
  }

  // render
  render()
}
