class FireFly {
  canvasSize: { width: number; height: number }
  appConfig: IConfig
  config: ISingleFireflyConfig
  originalConfig: ISingleFireflyConfig
  rainbowMode: boolean

  // this is used when nothing is initializedYet
  initializedConfig: ISingleFireflyConfig

  indexForMultipleColorValues: number

  utilGetRandomNumberBetween = (
    range: RangeType,
    getAsInteger: boolean = false
  ) => {
    const { min, max } = range
    return getAsInteger
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.random() * (max - min) + min
  }

  constructor(appConfig: IConfig, debugMode: boolean = false) {
    this.appConfig = appConfig
    this.indexForMultipleColorValues = 0

    this.canvasSize = this.appConfig.canvasSize
    this.rainbowMode = this.appConfig.rainbowMode

    // getting range values
    const firefliesConfig = appConfig.fireflies
    const {
      size,

      startingPositioning: {
        backFillPosition: startingBackFillPosition,
        method: startingPositioningMethod
      },
      opacityChangeOptions: {
        fadeRatio,
        fade: { rate: fadeRate, sizeChange: fadeSizeChangeConfig },
        glow: { rate: glowRate, sizeChange: glowSizeChangeConfig }
      },
      movement: {
        speedX,
        speedY,
        jitterCoefficientX,
        jitterCoefficientY,
        accelerationX,
        accelerationY
      },
      rotation: {
        speed: rotationSpeed,
        acceleration: rotationAcceleration,
        startingAngle,
        startAngleOnRandom
      },
      shaping: {
        regularPolygon: { sideCount },
        shape
      }
    } = firefliesConfig

    this.initializedConfig = {
      x: 0,
      y: 0,
      angle: 0,
      rotationSpeed: 0,
      rotationAcceleration: 0,
      colorValue: {
        h: 0,
        s: 0,
        l: 0,
        a: 0
      },
      debugMode: false,
      shape: "circle",
      sideCount: 3,
      opacityChangeMode: "fade",
      opacityChangeRate: 0,
      jitterX: 0,
      jitterY: 0,
      opacity: 0,
      size: 0,
      sizeBehaviourWhenFading: "none",
      sizeBehaviourWhenGlowing: "none",
      speedX: 0,
      speedY: 0,
      accelerationX: 0,
      accelerationY: 0,
      quarterCircleCenterLocation: "bottom-left"
    }

    this.config = this.initializedConfig

    const getQuarterCircleCenterLocation = () => {
      const allLocations: TwoDimentionalDirectionType[] = [
        "bottom-left",
        "bottom-right",
        "top-left",
        "top-right"
      ]

      return allLocations[
        this.utilGetRandomNumberBetween(
          { min: 0, max: allLocations.length },
          true
        )
      ]
    }

    const opacityChangeMode = Math.random() < fadeRatio ? "fade" : "glow"

    const getStartingAngle = () => {
      return startAngleOnRandom
        ? this.utilGetRandomNumberBetween({ min: 0, max: Math.PI * 2 })
        : startingAngle
    }

    this.config = {
      x: 0,
      y: 0,
      // this will change in config later
      angle: getStartingAngle(),
      rotationSpeed: this.utilGetRandomNumberBetween(rotationSpeed),
      rotationAcceleration:
        this.utilGetRandomNumberBetween(rotationAcceleration),
      accelerationX: this.utilGetRandomNumberBetween(accelerationX),
      accelerationY: this.utilGetRandomNumberBetween(accelerationY),
      colorValue: this.determineColor(
        firefliesConfig.colorValue.updateMode,
        firefliesConfig.colorValue.startingMehtod
      ),
      debugMode: debugMode,
      jitterX: this.utilGetRandomNumberBetween(jitterCoefficientX),
      jitterY: this.utilGetRandomNumberBetween(jitterCoefficientY),
      sizeBehaviourWhenFading:
        Math.random() < fadeSizeChangeConfig.frequency
          ? fadeSizeChangeConfig.mode
          : "none",
      sizeBehaviourWhenGlowing:
        Math.random() < glowSizeChangeConfig.frequency
          ? glowSizeChangeConfig.mode
          : "none",
      shape: shape,
      sideCount:
        shape === "square"
          ? 4
          : this.utilGetRandomNumberBetween(sideCount, true),
      opacity: this.determineColor(
        firefliesConfig.colorValue.updateMode,
        firefliesConfig.colorValue.startingMehtod
      ).a,
      opacityChangeRate: this.utilGetRandomNumberBetween(
        opacityChangeMode === "fade" ? fadeRate : glowRate
      ),
      opacityChangeMode,
      // size gets randomized based on your config
      size: this.utilGetRandomNumberBetween(size),
      speedX: this.utilGetRandomNumberBetween(speedX),
      speedY: this.utilGetRandomNumberBetween(speedY),

      // Where the center of the quarter circle is located
      quarterCircleCenterLocation: getQuarterCircleCenterLocation()
    }

    const { x: startingX, y: startingY } = this.getNewPosition(
      startingPositioningMethod,
      startingBackFillPosition
    )

    this.config.x = startingX
    this.config.y = startingY
    // color value is an object, so it must be copied
    this.originalConfig = {
      ...{
        ...this.config,
        colorValue: {
          ...this.config.colorValue
        }
      }
    }
  }

  debugLogger = (message: string) => {
    if (this.config.debugMode) {
      console.log(`[DEBUG] - ${message}`)
    }
  }

  getDeterminatedValue = (
    current: number,
    specification: RangeType,
    determinationMethod: ColorDeterminationMethodType,
    increasingOrDecreasingAmount: number = 0
  ) => {
    switch (determinationMethod) {
      case "min":
        return specification.min
      case "max":
        return specification.max
      case "random":
        return this.utilGetRandomNumberBetween(specification)
      case "increasing":
        return current + increasingOrDecreasingAmount > specification.max
          ? specification.min
          : current + increasingOrDecreasingAmount
      case "decreasing":
        return current - increasingOrDecreasingAmount < specification.min
          ? specification.max
          : current - increasingOrDecreasingAmount
      default:
        return 2
    }
  }

  getNewPosition = (
    method: StartingPositioningMethodType,
    backFillPosition: CartesianCoordinateSystemType
  ): CartesianCoordinateSystemType => {
    switch (method) {
      case "centerOfCanvas":
        return {
          x: this.canvasSize.width / 2,
          y: this.canvasSize.height / 2
        }
      case "random":
        return {
          x: Math.random() * this.canvasSize.width,
          y: Math.random() * this.canvasSize.height
        }
      case "randomX":
        return {
          x: Math.random() * this.canvasSize.width,
          y: backFillPosition.y
        }

      case "randomY":
        return {
          x: backFillPosition.x,
          y: Math.random() * this.canvasSize.height
        }
      case "set":
        return backFillPosition

      default:
        throw new Error("Unknown FadePositioningBehaviour")
    }
  }

  determineColor = (
    coloringMode: ColorValueUpdateModeType,
    determinationMethod: ColorDeterminationMethodType = "random"
  ): IHSLColor => {
    const { fireflies: firefliesConfig } = this.appConfig

    const {
      increasingOrDecreasingOnFade,
      singleColorValue,
      hueRangeSpecification,
      saturationRangeSpecification,
      lightnessRangeSpecification
    } = this.appConfig.fireflies.colorValue

    switch (coloringMode) {
      case "singleColor":
        return { ...singleColorValue }

      case "updatingHue":
        return {
          ...singleColorValue,
          h: this.getDeterminatedValue(
            this.config.colorValue.h,
            hueRangeSpecification,
            determinationMethod,
            increasingOrDecreasingOnFade
          )
        }

      case "updatingSaturation":
        return {
          ...singleColorValue,
          s: this.getDeterminatedValue(
            this.config.colorValue.s,
            saturationRangeSpecification,
            determinationMethod,
            increasingOrDecreasingOnFade
          )
        }

      case "updatingLightness":
        return {
          ...singleColorValue,
          l: this.getDeterminatedValue(
            this.config.colorValue.l,
            lightnessRangeSpecification,
            determinationMethod,
            increasingOrDecreasingOnFade
          )
        }

      case "updatingHslColor":
        const {
          h: hueRSpec,
          s: saturationRSpec,
          l: lightnessRSpec,
          a: alphaRSpec
        } = firefliesConfig.colorValue.hslColorRangeSpecification
        const {
          h: hueIncOrDec,
          s: saturationIncOrDec,
          l: lightnessIncOrDec,
          a: alphaIncOrDec
        } = firefliesConfig.colorValue.increasingOrDecreasingOnFadeAllValues

        return {
          h: this.getDeterminatedValue(
            this.config.colorValue.h,
            hueRSpec,
            determinationMethod,
            hueIncOrDec
          ),
          s: this.getDeterminatedValue(
            this.config.colorValue.s,
            saturationRSpec,
            determinationMethod,
            saturationIncOrDec
          ),
          l: this.getDeterminatedValue(
            this.config.colorValue.l,
            lightnessRSpec,
            determinationMethod,
            lightnessIncOrDec
          ),
          a: this.getDeterminatedValue(
            this.config.colorValue.a,
            alphaRSpec,
            determinationMethod,
            alphaIncOrDec
          )
        }

      case "multipleColorValues":
        const { weightedColorChoices } = firefliesConfig.colorValue

        const minIndex = 0
        const maxIndex = weightedColorChoices.length - 1

        if (determinationMethod === "random") {
          let cumulativeWeights = [weightedColorChoices[0].selectionWeight]
          for (let i = 1; i < weightedColorChoices.length; i++) {
            cumulativeWeights[i] =
              weightedColorChoices[i].selectionWeight + cumulativeWeights[i - 1]
          }

          // Generate a random number between 0 and the sum of weights
          let random =
            Math.random() * cumulativeWeights[cumulativeWeights.length - 1]

          // Find the first weight that's greater than or equal to the random number
          let i = 0
          while (cumulativeWeights[i] < random) {
            i++
          }

          // Return the corresponding color
          return { ...weightedColorChoices[i].value }
        }

        if (determinationMethod === "min") {
          return { ...weightedColorChoices[minIndex].value }
        }
        if (determinationMethod === "max") {
          return { ...weightedColorChoices[maxIndex].value }
        }
        if (
          determinationMethod === "increasing" ||
          determinationMethod === "decreasing"
        ) {
          this.indexForMultipleColorValues = this.getDeterminatedValue(
            this.indexForMultipleColorValues,
            {
              min: minIndex,
              max: maxIndex
            },
            determinationMethod,
            1
          )

          return {
            ...weightedColorChoices[this.indexForMultipleColorValues].value
          }
        }

      default:
        throw new Error("Invalid Coloring Mode")
    }
  }

  draw = (ctx: CanvasRenderingContext2D, hueShiftAmount: number = 0) => {
    ctx.fillStyle = hslStringify(
      this.config.colorValue.h + hueShiftAmount,
      this.config.colorValue.s,
      this.config.colorValue.l,
      this.config.opacity
    )

    const { x, y, size, angle, sideCount, quarterCircleCenterLocation } =
      this.config

    switch (this.config.shape) {
      case "circle":
        this.drawCircle(ctx, this.config.x, this.config.y, this.config.size / 2)
        break
      case "square":
      case "regularPolygon":
        this.drawRegularPolygon(ctx, x, y, size, angle, sideCount)
        break

      case "regularPolygram":
        this.drawPolygram(ctx, x, y, size, angle, sideCount)
        break

      case "quarterCircle": {
        this.drawQuarterCircle(
          ctx,
          x,
          y,
          size,
          quarterCircleCenterLocation,
          angle
        )

        break
      }
    }
  }

  drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.moveTo(x, y)

    ctx.fill()
  }

  drawRegularPolygon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    angle: number,
    sideCount: number
  ) => {
    const halfSize = size / 2

    angle = ((sideCount - 2) * Math.PI) / (2 * sideCount) + angle

    ctx.beginPath()
    for (let i = 0; i < sideCount; i++) {
      let dx = halfSize * Math.cos((i * 2 * Math.PI) / sideCount + angle)
      let dy = halfSize * Math.sin((i * 2 * Math.PI) / sideCount + angle)
      let outerX = x + +dx
      let outerY = y + dy
      if (i === 0) {
        ctx.moveTo(outerX, outerY)
      } else {
        ctx.lineTo(outerX, outerY)
      }
    }
    ctx.closePath()
    ctx.fill()
  }

  drawPolygram = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    angle: number,
    sideCount: number
  ) => {
    angle = ((sideCount - 2) * Math.PI) / (2 * sideCount) + angle

    const innerRadius = size / 4
    const outerRadius = size / 2

    ctx.beginPath()
    for (let i = 0; i < sideCount; i++) {
      let dx = outerRadius * Math.cos((i * 2 * Math.PI) / sideCount + angle)
      let dy = outerRadius * Math.sin((i * 2 * Math.PI) / sideCount + angle)
      let outerX = x + dx
      let outerY = y + dy

      dx = innerRadius * Math.cos(((i + 0.5) * 2 * Math.PI) / sideCount + angle)
      dy = innerRadius * Math.sin(((i + 0.5) * 2 * Math.PI) / sideCount + angle)
      let innerX = x + dx
      let innerY = y + dy

      ctx.lineTo(outerX, outerY)
      ctx.lineTo(innerX, innerY)
    }
    ctx.fill()
  }

  drawQuarterCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    centerOn: TwoDimentionalDirectionType,
    angle: number
  ) => {
    let cX = 0,
      cY = 0,
      startAngle = 0,
      endAngle = 0
    switch (centerOn) {
      case "top-left":
        cY = y - size / 2
        cX = x - size / 2
        startAngle = 0 + angle
        endAngle = Math.PI / 2 + angle
        break

      case "top-right":
        cY = y + size / 2
        cX = x + size / 2
        startAngle = Math.PI / 2 + angle
        endAngle = Math.PI + angle
        break
      case "bottom-left":
        cX = x - size / 2
        cY = y + size / 2
        startAngle = (3 * Math.PI) / 2 + angle
        endAngle = 2 * Math.PI + angle
        break
      case "bottom-right":
        cX = x - size / 2
        cY = y + size / 2
        startAngle = Math.PI + angle
        endAngle = (3 * Math.PI) / 2 + angle

        break
    }

    ctx.beginPath()
    ctx.moveTo(cX, cY)
    ctx.arc(cX, cY, size, startAngle, endAngle)

    ctx.fill()
  }
  // handleFade() lowers the opacity of the firefly
  // if it reaches 0, it is moved to a random location
  // and its opacity is reset to a random value (> 0.5)
  handleFade = () => {
    const { opacityChangeRate, sizeBehaviourWhenFading } = this.config
    this.config.opacity = Math.max(this.config.opacity - opacityChangeRate, 0)

    if (sizeBehaviourWhenFading === "shrink")
      this.config.size = this.config.opacity * this.originalConfig.size

    if (sizeBehaviourWhenFading === "grow") {
      if (this.config.opacity === 0) {
        this.config.opacity = 1 - this.config.opacity
        this.config.size = 0
      } else
        this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }

    if (this.config.opacity === 0) {
      this.resetConfigAfterOpacityChange("fade")
    }
  }

  // handleGlow() highers the opacity of the firefly
  // if it reaches 1, it is moved to a random location
  // and its opacity is reset to a random value (> 0.5)

  handleGlow = () => {
    const { opacityChangeRate, sizeBehaviourWhenGlowing } = this.config
    this.config.opacity = Math.min(this.config.opacity + opacityChangeRate, 1)

    if (sizeBehaviourWhenGlowing === "grow")
      this.config.size = this.config.opacity * this.originalConfig.size

    if (sizeBehaviourWhenGlowing === "shrink") {
      if (this.config.opacity === 0) {
        this.config.opacity = 1 - this.config.opacity
        this.config.size = 0
      } else
        this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }

    if (this.config.opacity === 1) {
      this.resetConfigAfterOpacityChange("glow")
    }
  }

  resetConfigAfterOpacityChange = (
    opacityChangeMode: OpacityChangeModeType
  ) => {
    const { fade: fadeConfig, glow: glowConfig } =
      this.appConfig.fireflies.opacityChangeOptions

    const opacityChangeConfig =
      opacityChangeMode === "fade" ? fadeConfig : glowConfig

    const {
      resetColorAfterOpacityChange,
      resetSizeAfterOpacityChange,
      resetRateAfterOpacityChange,
      opacityAfterOpacityChange
    } = opacityChangeConfig

    const { size } = this.appConfig.fireflies

    this.resetSpeeds()

    if (resetRateAfterOpacityChange) {
      this.config.opacityChangeRate = this.utilGetRandomNumberBetween(
        opacityChangeConfig.rate
      )
    }

    if (resetSizeAfterOpacityChange) {
      this.config.size = this.utilGetRandomNumberBetween(size)
    }

    if (resetColorAfterOpacityChange) {
      this.config.colorValue = this.determineColor(
        this.appConfig.fireflies.colorValue.updateMode,
        this.appConfig.fireflies.colorValue.onFadeMethod
      )
    }

    const { x: newX, y: newY } = this.getNewPosition(
      opacityChangeConfig.positioningMethod,
      opacityChangeConfig.backFillPosition
    )

    this.config.x = newX
    this.config.y = newY

    // resets the opacity to a new or original opacity
    this.config.opacity = opacityChangeConfig.resetRateAfterOpacityChange
      ? this.utilGetRandomNumberBetween(opacityAfterOpacityChange)
      : this.originalConfig.opacity

    this.config.accelerationX = this.utilGetRandomNumberBetween(
      this.appConfig.fireflies.movement.accelerationX
    )
    this.config.accelerationY = this.utilGetRandomNumberBetween(
      this.appConfig.fireflies.movement.accelerationY
    )

    this.config.rotationSpeed = this.originalConfig.rotationSpeed
  }

  somewhereOverTheRainbow = () => {
    this.config.colorValue.h += Math.random() * 3
  }

  handleBoundsPositioning = () => {
    const {
      bounds: boundsConfig,
      colorValue: {
        updateMode: colorValueUpdateMode,
        hueRangeSpecification: { min: minAllowedHue, max: maxAllowedHue },
        hslColorRangeSpecification: {
          h: { max: maxAllowedHueInHsl, min: minAllowedHueInHsl }
        }
      },

      size: { min: minAllowedSize, max: maxAllowedSize }
    } = this.appConfig.fireflies

    const {
      afterImpactSpeedMultiplier: {
        top: afterImpactSpeedMultiplierTop,
        right: afterImpactSpeedMultiplierRight,
        bottom: afterImpactSpeedMultiplierBottom,
        left: afterImpactSpeedMultiplierLeft
      },
      toggleBounds: {
        top: stopAtBoundTop,
        right: stopAtBoundRight,
        bottom: stopAtBoundBottom,
        left: stopAtBoundLeft
      },
      hueIncreaseAmountAfterImpact: {
        top: hueIncreaseAmountAfterImpactTop,
        right: hueIncreaseAmountAfterImpactRight,
        bottom: hueIncreaseAmountAfterImpactBottom,
        left: hueIncreaseAmountAfterImpactLeft
      },
      sizeMultiplierAfterImpact: {
        top: sizeMultiplierAfterImpactTop,
        right: sizeMultiplierAfterImpactRight,
        bottom: sizeMultiplierAfterImpactBottom,
        left: sizeMultiplierAfterImpactLeft
      }
    } = boundsConfig

    const { size } = this.config

    const increaseHueAfterImpact = (amount: number) => {
      switch (colorValueUpdateMode) {
        case "singleColor":
          return
        case "updatingHslColor":
          this.config.colorValue.h += amount

          if (this.config.colorValue.h > maxAllowedHueInHsl) {
            this.config.colorValue.h = minAllowedHueInHsl
            return
          }

          if (this.config.colorValue.h < minAllowedHueInHsl) {
            this.config.colorValue.h = maxAllowedHueInHsl
            return
          }
          return

        case "updatingHue":
          this.config.colorValue.h += amount

          if (this.config.colorValue.h > maxAllowedHue) {
            this.config.colorValue.h = minAllowedHue
            return
          }

          if (this.config.colorValue.h < minAllowedHue) {
            this.config.colorValue.h = maxAllowedHue
            return
          }
          return

        case "updatingSaturation":
        case "updatingLightness":
        case "multipleColorValues":
          return
      }
    }

    const changeSizeAfterImpact = (multiplier: number) => {
      this.config.size = Math.ceil(multiplier * this.config.size)

      if (this.config.size < minAllowedSize) {
        this.config.size = maxAllowedSize
        return
      }

      if (
        this.config.size > maxAllowedSize &&
        this.appConfig.fireflies.bounds.changeSizeToMinAfterHitMaxSize
      ) {
        this.config.size = minAllowedSize
        return
      }
    }

    const topEdge = size / 2
    const leftEdge = size / 2
    const bottomEdge = this.canvasSize.height - size / 2
    const rightEdge = this.canvasSize.width - size / 2

    const isOnTopEdge = this.config.y < topEdge
    const isOnBottomEdge = this.config.y > bottomEdge
    const isOnLeftEdge = this.config.x < leftEdge
    const isOnRightEdge = this.config.x > rightEdge

    const changeConfigAfterImpact = (
      edge: number,
      edgeAxis: "x" | "y",
      afterImpactSpeedMultiplier: number,
      hueIncreaseAmountAfterImpact: number,
      sizeMultiplierAfterImpact: number
    ) => {
      // ensure the position after the impact
      if (edgeAxis === "x") {
        this.config.x = edge
        this.config.speedX = -afterImpactSpeedMultiplier * this.config.speedX
      }
      if (edgeAxis === "y") {
        this.config.y = edge
        this.config.speedY = -afterImpactSpeedMultiplier * this.config.speedY
      }

      // impact increases/decreases the hue
      increaseHueAfterImpact(hueIncreaseAmountAfterImpact)

      // impact causes fireflies to shrink/grow
      changeSizeAfterImpact(sizeMultiplierAfterImpact)
    }

    if (isOnBottomEdge && stopAtBoundBottom)
      changeConfigAfterImpact(
        bottomEdge,
        "y",
        afterImpactSpeedMultiplierBottom,
        hueIncreaseAmountAfterImpactBottom,
        sizeMultiplierAfterImpactBottom
      )

    if (isOnTopEdge && stopAtBoundTop)
      changeConfigAfterImpact(
        topEdge,
        "y",
        afterImpactSpeedMultiplierTop,
        hueIncreaseAmountAfterImpactTop,
        sizeMultiplierAfterImpactTop
      )

    if (isOnLeftEdge && stopAtBoundLeft)
      changeConfigAfterImpact(
        leftEdge,
        "x",
        afterImpactSpeedMultiplierLeft,
        hueIncreaseAmountAfterImpactLeft,
        sizeMultiplierAfterImpactLeft
      )

    if (isOnRightEdge && stopAtBoundRight)
      changeConfigAfterImpact(
        rightEdge,
        "x",
        afterImpactSpeedMultiplierRight,
        hueIncreaseAmountAfterImpactRight,
        sizeMultiplierAfterImpactRight
      )
  }

  handleOutOfBoundsPositioning = () => {
    const { size, x, y } = this.config

    const isOutOfBoundsFromLeft = x < -size / 2
    const isOutOfBoundsFromRight = x > this.canvasSize.width + size / 2
    const isOutOfBoundsFromTop = y < -size / 2
    const isOutOfBoundsFromBottom = y > this.canvasSize.height + size / 2

    const isOutOfBounds =
      isOutOfBoundsFromLeft ||
      isOutOfBoundsFromRight ||
      isOutOfBoundsFromTop ||
      isOutOfBoundsFromBottom

    if (isOutOfBounds) {
      const {
        backFillPosition: outOfBoundsBackFillPosition,
        postitioningMethod,
        resetSpeeds: resetSpeedsIfOutOfBounds,
        resetRotation: resetRotationIfOutOfBounds
      } = this.appConfig.fireflies.outOfBounds

      if (resetSpeedsIfOutOfBounds) this.resetSpeeds()
      if (resetRotationIfOutOfBounds)
        this.config.rotationSpeed = this.originalConfig.rotationSpeed

      switch (postitioningMethod) {
        case "forceFade":
          if (this.config.opacityChangeMode === "fade") this.config.opacity = 0
          else this.config.opacity = 1
          break
        case "continueOnOtherSide":
          // --  reset the speed after going out of bounds
          if (isOutOfBoundsFromLeft) {
            this.config.x = this.canvasSize.width + size / 2
          }
          if (isOutOfBoundsFromRight) {
            this.config.x = -size / 2
          }
          if (isOutOfBoundsFromTop) {
            this.config.y = this.canvasSize.height + size / 2
          }
          if (isOutOfBoundsFromBottom) {
            this.config.y = -size / 2
          }
          break

        case "random":
          this.config.x = Math.random() * this.canvasSize.width
          this.config.y = Math.random() * this.canvasSize.height
          break

        case "set":
          this.config.x = outOfBoundsBackFillPosition.x
          this.config.y = outOfBoundsBackFillPosition.y
          break

        case "randomX":
          this.config.x = Math.random() * this.canvasSize.width
          this.config.y = outOfBoundsBackFillPosition.y
          break

        case "randomY":
          this.config.x = outOfBoundsBackFillPosition.x
          this.config.y = Math.random() * this.canvasSize.height
          break

        case "centerOfCanvas":
          this.config.x = this.canvasSize.width / 2
          this.config.y = this.canvasSize.height / 2
          break

        case "none":
          break

        default:
          throw new Error("Unknown OutOfBoundPositioningBehaviors")
          break
      }
    }
  }

  resetSpeeds = () => {
    // resets speed (based on acceleration)
    this.config.speedX = this.originalConfig.speedX
    this.config.speedY = this.originalConfig.speedY
  }

  handleAcceleration = () => {
    const { accelerateInCurrentMovingDirection } =
      this.appConfig.fireflies.movement
    // increase/decreasing speed of fireflies bt acceleration
    this.config.speedX +=
      this.config.accelerationX *
      (accelerateInCurrentMovingDirection ? Math.sign(this.config.speedX) : 1)

    this.config.speedY +=
      this.config.accelerationY *
      (accelerateInCurrentMovingDirection ? Math.sign(this.config.speedY) : 1)
  }

  handleMove = () => {
    this.config.x += this.config.speedX
    this.config.y += this.config.speedY
  }

  handleJitter = () => {
    const { jitterX, jitterY } = this.config

    this.config.x += jitterX * 2 * Math.random() - jitterX
    this.config.y += jitterY * 2 * Math.random() - jitterY
  }

  handleRotation = () => {
    this.config.angle += this.config.rotationSpeed
  }

  handleRotationAcceleration = () => {
    this.config.rotationSpeed += this.config.rotationAcceleration
  }

  update(ctx: CanvasRenderingContext2D, hueShiftAmount: number) {
    this.draw(ctx, hueShiftAmount)
    this.handleRotation()
    this.handleRotationAcceleration()

    // handle Opacity change
    if (this.config.opacityChangeMode === "fade") this.handleFade()
    else this.handleGlow()

    this.handleMove()
    this.handleAcceleration()
    this.handleJitter()

    this.handleBoundsPositioning()
    this.handleOutOfBoundsPositioning()

    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }
  }
}
