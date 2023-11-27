class FireFly {
  canvasSize: { width: number; height: number }
  appConfig: IConfig
  config: ISingleFireflyConfig
  originalConfig: ISingleFireflyConfig
  rainbowMode: boolean
  x: number
  y: number

  utilGetRandomNumberBetween = (
    range: IRange,
    getAsInteger: boolean = false
  ) => {
    const { min, max } = range
    if (getAsInteger) return Math.floor(Math.random() * (max - min) + min)
    return Math.random() * (max - min) + min
  }

  constructor(x: number, y: number, appConfig: IConfig) {
    this.x = x
    this.y = y
    this.appConfig = appConfig

    // getting range values
    const firefliesConfig = appConfig.fireflies
    const {
      size,
      speedX,
      speedY,
      fadeRate,
      jitterCoefficientX,
      jitterCoefficientY
    } = firefliesConfig

    this.config = {
      colorValue: this.determineColor(firefliesConfig.coloringMode),
      jitterX: this.utilGetRandomNumberBetween(jitterCoefficientX),
      jitterY: this.utilGetRandomNumberBetween(jitterCoefficientY),
      sizeBehaviourWhenFading:
        Math.random() < firefliesConfig.sizeBehaviourWhenFading.frequency
          ? firefliesConfig.sizeBehaviourWhenFading.behaviorType
          : "none",
      opacity: this.determineColor(firefliesConfig.coloringMode).a,
      fadeRate: this.utilGetRandomNumberBetween(fadeRate),
      // size gets randomized based on your config
      size: this.utilGetRandomNumberBetween(size),
      speedX: this.utilGetRandomNumberBetween(speedX),
      speedY: this.utilGetRandomNumberBetween(speedY),
      willChangeSize:
        Math.random() < firefliesConfig.sizeBehaviourWhenFading.frequency
    }

    // color value is an object, so it must be copied
    this.originalConfig = {
      ...{
        ...this.config,
        colorValue: {
          ...this.config.colorValue
        }
      }
    }

    this.canvasSize = this.appConfig.canvasSize

    this.rainbowMode = this.appConfig.rainbowMode
  }

  determineColor = (coloringMode: ColoringModes): IHSLColor => {
    const { fireflies: firefliesConfig } = this.appConfig
    const {
      singleColorValue,
      hueRangeSpecification,
      saturationRangeSpecification,
      lightnessRangeSpecification
    } = firefliesConfig

    switch (coloringMode) {
      case "singleColor":
        return {
          ...firefliesConfig.singleColorValue,

          h: firefliesConfig.singleColorValue.h
        }

      case "randomHue":
        return {
          ...singleColorValue,
          h: this.utilGetRandomNumberBetween(hueRangeSpecification)
        }

      case "randomSaturation":
        return {
          ...singleColorValue,
          s: this.utilGetRandomNumberBetween(saturationRangeSpecification)
        }

      case "randomLightness":
        return {
          ...singleColorValue,
          l: this.utilGetRandomNumberBetween(lightnessRangeSpecification)
        }

      case "randomHslColor":
        const {
          h: hueRSpec,
          s: saturationRSpec,
          l: lightnessRSpec,
          a: alphaRSpec
        } = firefliesConfig.hslColorRangeSpecification

        return {
          h: this.utilGetRandomNumberBetween(hueRSpec),
          s: this.utilGetRandomNumberBetween(saturationRSpec),
          l: this.utilGetRandomNumberBetween(lightnessRSpec),
          a: this.utilGetRandomNumberBetween(alphaRSpec)
        }

      case "multipleColorValues":
        const { weightedColorChoices } = firefliesConfig
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
        return weightedColorChoices[i].value

      default:
        throw new Error("Invalid Coloring Mode")
    }
  }

  draw = (ctx: CanvasRenderingContext2D, hueShiftAmount: number = 0) => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.config.size, 0, 2 * Math.PI)
    ctx.fillStyle = hslStringify(
      this.config.colorValue.h + hueShiftAmount,
      this.config.colorValue.s,
      this.config.colorValue.l,
      this.config.opacity
    )

    ctx.fill()
  }

  // handleFade() lowers the opacity of the firefly
  // if it reaches 0, it is moved to a random location
  // and its opacity is reset to a random value (> 0.5)
  handleFade = () => {
    const { fadeRate, sizeBehaviourWhenFading, willChangeSize } = this.config
    this.config.opacity = this.config.opacity - fadeRate

    if (this.config.opacity < 0) {
      this.resetConfigAfterFade()
    }

    if (sizeBehaviourWhenFading === "shrink" && willChangeSize)
      this.config.size = this.config.opacity * this.originalConfig.size

    if (sizeBehaviourWhenFading === "grow" && willChangeSize) {
      this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }
  }

  resetConfigAfterFade = () => {
    const { sizeBehaviourWhenFading, willChangeSize } = this.config

    const { resetColorAfterFade, resetSizeAfterFade, resetFadeRateAfterFade } =
      this.appConfig.fireflies

    const { size, fadeRate, newFadeRateAfterFade } = this.appConfig.fireflies

    this.resetSpeeds()

    if (sizeBehaviourWhenFading === "shrink" && willChangeSize) {
      this.config.size = this.config.opacity * this.originalConfig.size
    }

    if (sizeBehaviourWhenFading === "grow" && willChangeSize) {
      this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }

    if (resetFadeRateAfterFade) {
      this.config.fadeRate = this.utilGetRandomNumberBetween(fadeRate)
    }

    if (resetSizeAfterFade) {
      this.config.size = this.utilGetRandomNumberBetween(size)
    }

    if (resetColorAfterFade) {
      this.determineColor(this.appConfig.fireflies.coloringMode)
    }

    this.handleFadePositioning(
      this.appConfig.fireflies.fadePositioningBehaviour
    )

    // resets the opacity to a new or original opacity
    this.config.opacity = this.appConfig.fireflies.resetFadeRateAfterFade
      ? this.utilGetRandomNumberBetween(newFadeRateAfterFade)
      : this.originalConfig.opacity
  }

  somewhereOverTheRainbow = () => {
    this.config.colorValue.h += Math.random() * 3
  }

  handleFadePositioning = (behaviour: FadePositioningBehaviours) => {
    const { newPositionAfterFade } = this.appConfig.fireflies

    switch (behaviour) {
      case "none":
        break
      case "restartAtCenterOfCanvas":
        this.x = this.canvasSize.width / 2
        this.y = this.canvasSize.height / 2
        break
      case "restartAtRandomPosition":
        this.x = Math.random() * this.canvasSize.width
        this.y = Math.random() * this.canvasSize.height
        break
      case "restartAtRandomXPosition":
        this.x = Math.random() * this.canvasSize.width
        this.y = newPositionAfterFade.y
        break
      case "restartAtRandomYPosition":
        this.x = newPositionAfterFade.x
        this.y = Math.random() * this.canvasSize.height
        break

      case "restartAtSetPosition":
        this.x = newPositionAfterFade.x
        this.y = newPositionAfterFade.y
        break
      default:
        throw new Error("Unknown FadePositioningBehaviour")
    }
  }

  handleOutOfBoundsPositioning = (
    behaviour: OutOfBoundsPositioningBehaviours
  ) => {
    const { newPositionAfterOutOfBounds } = this.appConfig.fireflies

    const { size } = this.config
    const isOutOfBoundsFromLeft = this.x < -size
    const isOutOfBoundsFromRight = this.x > this.canvasSize.width + size
    const isOutOfBoundsFromTop = this.y < -size
    const isOutOfBoundsFromBottom = this.y > this.canvasSize.height + size

    const isOutOfBounds =
      isOutOfBoundsFromLeft ||
      isOutOfBoundsFromRight ||
      isOutOfBoundsFromTop ||
      isOutOfBoundsFromBottom

    isOutOfBounds && console.log(this.x, this.y)

    if (isOutOfBounds && this.appConfig.fireflies.resetSpeedsAfterOutOfBounds) {
      this.resetSpeeds()
    }

    switch (behaviour) {
      case "forceFade":
        if (isOutOfBounds) {
          this.config.opacity = 0
        }
        break
      case "continueOnOtherSide":
        // --  reset the speed after going out of bounds
        if (isOutOfBoundsFromLeft) this.x = this.canvasSize.width + size
        if (isOutOfBoundsFromRight) this.x = -size
        if (isOutOfBoundsFromTop) this.y = this.canvasSize.height + size
        if (isOutOfBoundsFromBottom) this.y = -size
        break

      case "restartAtRandomPosition":
        if (isOutOfBounds) {
          this.x = Math.random() * this.canvasSize.width
          this.y = Math.random() * this.canvasSize.height
        }
        break

      case "restartAtSetPosition":
        if (isOutOfBounds) {
          this.x = newPositionAfterOutOfBounds.x
          this.y = newPositionAfterOutOfBounds.y
        }
        break

      case "restartAtRandomXPosition":
        if (isOutOfBounds) {
          this.x = Math.random() * this.canvasSize.width
          this.y = newPositionAfterOutOfBounds.y
        }
        break

      case "restartAtRandomYPosition":
        if (isOutOfBounds) {
          this.x = newPositionAfterOutOfBounds.x
          this.y = Math.random() * this.canvasSize.height
        }
        break

      case "restartAtCenterOfCanvas":
        if (isOutOfBounds) {
          this.x = this.canvasSize.width / 2
          this.y = this.canvasSize.height / 2
        }
        break

      case "none":
        break
      default:
        throw new Error("Unknown OutOfBoundPositioningBehaviors")
        break
    }
  }

  resetSpeeds = () => {
    // resets speed (based on acceleration)
    this.config.speedX = this.originalConfig.speedX
    this.config.speedY = this.originalConfig.speedY
  }

  handleAcceleration = () => {
    const { accelerateInCurrentMovingDirection, accelerationX, accelerationY } =
      this.appConfig.fireflies
    // increase/decreasing speed of fireflies bt acceleration
    this.config.speedX +=
      accelerationX *
      (accelerateInCurrentMovingDirection ? Math.sign(this.config.speedX) : 1)

    this.config.speedY +=
      accelerationY *
      (accelerateInCurrentMovingDirection ? Math.sign(this.config.speedY) : 1)
  }

  handleMove = () => {
    this.handleOutOfBoundsPositioning(
      this.appConfig.fireflies.outOfBoundsPositioningBehaviour
    )

    this.x += this.config.speedX
    this.y += this.config.speedY
  }

  handleJitter = () => {
    const { jitterX, jitterY } = this.config

    this.x += jitterX * 2 * Math.random() - jitterX
    this.y += jitterY * 2 * Math.random() - jitterY
  }

  update(ctx: CanvasRenderingContext2D, hueShiftAmount: number) {
    this.handleFade()
    this.handleMove()
    this.handleAcceleration()
    this.handleJitter()
    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }

    this.draw(ctx, hueShiftAmount)
  }
}
