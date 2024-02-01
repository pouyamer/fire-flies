const hslStringify = (h: number, s: number, l: number, a: number = 1) =>
  `hsla(${h}, ${s}%, ${l}%, ${a})`

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
  const finalConfig: IConfig = deepMerge(config, desiredConfig)
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
    finalConfig.canvasSize.width = parseInt(
      getComputedStyle(parentElement).width.split("px")[0]
    )
    finalConfig.canvasSize.height = parseInt(
      getComputedStyle(parentElement).height.split("px")[0]
    )

    // -- Reiniatiating the canvas
    firefliesCanvas.width = canvasSize.width
    firefliesCanvas.height = canvasSize.height
  }

  let fireflies: FireFly[] = []
  const wind = new Wind(finalConfig.wind)

  // creating fireflies based on finalConfig
  for (let i = 0; i < finalConfig.fireflies.count; i++) {
    const newFirefly = new FireFly(finalConfig)
    wind.affectFirefly(newFirefly, newFirefly.config.x / canvasSize.width)
    fireflies.push(newFirefly)
  }

  // ============== TEST ============*/
  // first firefly is subject to debug
  fireflies[0].config.debugMode = true

  const testFireFlyconfig = fireflies[0].config

  if (fireflies[0].config.debugMode) {
    console.log(testFireFlyconfig.colorValue)
  }
  // =============== END TEST =============== */

  // get the sizes right, when window gets resized:

  window.addEventListener("resize", () => {
    // setting canvas width and height to those of parentElement's
    finalConfig.canvasSize.width = parseInt(
      getComputedStyle(parentElement).width.split("px")[0]
    )
    finalConfig.canvasSize.height = parseInt(
      getComputedStyle(parentElement).height.split("px")[0]
    )
    // -- Reiniatiating the canvas
    firefliesCanvas.width = canvasSize.width
    firefliesCanvas.height = canvasSize.height
  })

  const { hueShiftMode } = finalConfig.fireflies

  let hueShiftAmount = 0

  if (!finalConfig.rainbowMode) {
    // Hue shift based on mouse position
    if (
      hueShiftMode === "onHorizontalMousePosition" ||
      hueShiftMode === "onVerticalMousePosition"
    ) {
      window.addEventListener("mousemove", e => {
        // get the position of the canvas
        const rect = firefliesCanvas.getBoundingClientRect()
        // x position within the canvas
        const x = e.clientX - rect.left
        // y position within the canvas
        const y = e.clientY - rect.top

        if (hueShiftMode === "onHorizontalMousePosition") {
          hueShiftAmount = (x * 360) / canvasSize.width
        }

        if (hueShiftMode === "onVerticalMousePosition") {
          hueShiftAmount = (y * 360) / canvasSize.height
        }
      })
    }

    // hue shift based on keys (arrowDown, arrowUp)

    if (hueShiftMode === "onArrowKeys") {
      window.addEventListener("keydown", e => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowRight":
            hueShiftAmount++
            break

          case "ArrowDown":
          case " ArrowLeft":
            hueShiftAmount--
            break

          default:
            break
        }

        // finally:
        fireflies.forEach(firefly => {
          firefly.config.colorValue.h =
            hueShiftAmount + firefly.config.colorValue.h
        })
      })
    }
  }

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
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update(ctx, hueShiftAmount)
    }

    // requestAnimationFrame causes the browser to call the function again and again
    requestAnimationFrame(render)
  }

  // render
  render()
}
