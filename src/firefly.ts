class FireFly {
  canvasSize: { width: number; height: number }
  appConfig: IConfig
  config: ISingleFireflyConfig
  originalConfig: ISingleFireflyConfig
  rainbowMode: boolean
  x: number
  y: number

  constructor(x: number, y: number, appConfig: IConfig) {
    this.x = x
    this.y = y
    this.appConfig = appConfig
    const firefliesConfig = appConfig.fireflies

    const { min: maxSize, max: minSize } = firefliesConfig.size
    const { min: minSpeedX, max: maxSpeedX } = firefliesConfig.speedX
    const { min: minSpeedY, max: maxSpeedY } = firefliesConfig.speedY
    const { accelerationX, accelerationY, accelerateInCurrentMovingDirection } =
      firefliesConfig
    const { min: minOpacityDecay, max: maxOpacityDecay } =
      firefliesConfig.opacityDecay

    this.config = {
      accelerateInCurrentMovingDirection,
      accelerationX,
      accelerationY,
      colorValue: this.determineColor(firefliesConfig.coloringMode),
      fadeSizeBehaviorType:
        Math.random() < firefliesConfig.fadeSizeBehavior.frequency
          ? firefliesConfig.fadeSizeBehavior.behaviorType
          : "none",
      opacity: this.determineColor(firefliesConfig.coloringMode).a,
      opacityDecay:
        Math.random() * (maxOpacityDecay - minOpacityDecay) + minOpacityDecay,
      resetColorWhenFaded: firefliesConfig.resetColorWhenFaded,
      resetDecayAmountWhenFaded: firefliesConfig.resetDecayAmountWhenFaded,
      resetSizeWhenFaded: firefliesConfig.resetSizeWhenFaded,
      // size gets randomized based on your config
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: Math.random() * (maxSpeedX - minSpeedX) + minSpeedX,
      speedY: Math.random() * (maxSpeedY - minSpeedY) + minSpeedY,
      willChangeSize: Math.random() < firefliesConfig.fadeSizeBehavior.frequency
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
    switch (coloringMode) {
      case "singleColor":
        return firefliesConfig.singleColorValue

      case "randomHue":
        return {
          ...firefliesConfig.hueRangeSpecification,
          h:
            Math.floor(
              Math.random() *
                (firefliesConfig.hueRangeSpecification.h.max -
                  firefliesConfig.hueRangeSpecification.h.min +
                  1)
            ) + firefliesConfig.hueRangeSpecification.h.min
        }

      case "randomSaturation":
        return {
          ...firefliesConfig.saturationRangeSpecification,
          s:
            Math.floor(
              Math.random() *
                (firefliesConfig.saturationRangeSpecification.s.max -
                  firefliesConfig.saturationRangeSpecification.s.min +
                  1)
            ) + firefliesConfig.saturationRangeSpecification.s.min
        }

      case "randomLightness":
        return {
          ...firefliesConfig.lightnessRangeSpecification,
          l:
            Math.floor(
              Math.random() *
                (firefliesConfig.lightnessRangeSpecification.l.max -
                  firefliesConfig.lightnessRangeSpecification.l.min +
                  1)
            ) + firefliesConfig.lightnessRangeSpecification.l.min
        }

      case "randomHslColor":
        const {
          h: hueRSpec,
          s: saturationRSpec,
          l: lightnessRSpec,
          a: alphaRSpec
        } = firefliesConfig.hslColorRangeSpecification

        return {
          h:
            Math.floor(Math.random() * (hueRSpec.max - hueRSpec.min + 1)) +
            hueRSpec.min,
          s:
            Math.floor(
              Math.random() * (saturationRSpec.max - saturationRSpec.min + 1)
            ) + saturationRSpec.min,
          l:
            Math.floor(
              Math.random() * (lightnessRSpec.max - lightnessRSpec.min + 1)
            ) + lightnessRSpec.min,
          a:
            Math.floor(Math.random() * (alphaRSpec.max - alphaRSpec.min + 1)) +
            alphaRSpec.min
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

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.config.size, 0, 2 * Math.PI)
    ctx.fillStyle = hslStringify(
      this.config.colorValue.h,
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
    const { opacityDecay, fadeSizeBehaviorType, willChangeSize } = this.config
    this.config.opacity = this.config.opacity - opacityDecay

    if (this.config.opacity < 0) {
      this.resetConfigAfterFade()
    }

    if (fadeSizeBehaviorType === "shrink" && willChangeSize)
      this.config.size = this.config.opacity * this.originalConfig.size

    if (fadeSizeBehaviorType === "grow" && willChangeSize) {
      this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }
  }

  resetConfigAfterFade = () => {
    const {
      resetSizeWhenFaded,
      resetColorWhenFaded,
      fadeSizeBehaviorType,
      willChangeSize,
      resetDecayAmountWhenFaded
    } = this.config
    const { min: minOpacityDecay, max: maxOpacityDecay } =
      this.appConfig.fireflies.opacityDecay
    const { min: minSize, max: maxSize } = this.appConfig.fireflies.size
    const { min: minOpacityWhenFaded, max: maxOpacityWhenFaded } =
      this.appConfig.fireflies.opacityWhenFaded

    this.resetSpeed()

    if (fadeSizeBehaviorType === "shrink" && willChangeSize) {
      this.config.size = this.config.opacity * this.originalConfig.size
    }

    if (fadeSizeBehaviorType === "grow" && willChangeSize) {
      this.config.size = (1 - this.config.opacity) * this.originalConfig.size
    }

    if (resetDecayAmountWhenFaded) {
      this.config.opacityDecay =
        Math.random() * (maxOpacityDecay - minOpacityDecay) + minOpacityDecay
    }

    if (resetSizeWhenFaded) {
      this.config.size = Math.random() * (maxSize - minSize) + minSize
    }

    if (resetColorWhenFaded) {
      this.determineColor(this.appConfig.fireflies.coloringMode)
    }

    this.handleFadePositioning(
      this.appConfig.fireflies.fadePositioningBehaviour
    )

    // resets the opacity to a new or original opacity
    this.config.opacity = this.appConfig.fireflies.randomOpacityWhenFaded
      ? Math.random() * (maxOpacityWhenFaded - minOpacityWhenFaded) +
        minOpacityWhenFaded
      : this.originalConfig.opacity
  }

  somewhereOverTheRainbow = () => {
    this.config.colorValue.h += Math.random() * 3
  }

  handleFadePositioning = (behaviour: FadePositioningBehaviours) => {
    const { fadeRestartPosition } = this.appConfig.fireflies

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
        this.y = fadeRestartPosition.y
        break
      case "restartAtRandomYPosition":
        this.x = fadeRestartPosition.x
        this.y = Math.random() * this.canvasSize.height
        break

      case "restartAtSetPosition":
        this.x = fadeRestartPosition.x
        this.y = fadeRestartPosition.y
        break
      default:
        throw new Error("Unknown FadePositioningBehaviour")
    }
  }

  handleOutOfBoundsPositioning = (
    behaviour: OutOfBoundsPositioningBehaviours
  ) => {
    const { outOfBoundsRestartPosition } = this.appConfig.fireflies

    const { size } = this.config
    const isOutOfBoundsFromLeft = this.x <= -size
    const isOutOfBoundsFromRight = this.x >= this.canvasSize.width + size
    const isOutOfBoundsFromTop = this.y <= -size
    const isOutOfBoundsFromBottom = this.y >= this.canvasSize.height + size

    const isOutOfBounds =
      isOutOfBoundsFromLeft ||
      isOutOfBoundsFromRight ||
      isOutOfBoundsFromTop ||
      isOutOfBoundsFromBottom

    if (isOutOfBounds && this.appConfig.fireflies.resetSpeedWhenOutOfBounds) {
      this.resetSpeed()
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
          this.x = outOfBoundsRestartPosition.x
          this.y = outOfBoundsRestartPosition.y
        }
        break

      case "restartAtRandomXPosition":
        if (isOutOfBounds) {
          this.x = Math.random() * this.canvasSize.width
          this.y = outOfBoundsRestartPosition.y
        }
        break

      case "restartAtRandomYPosition":
        if (isOutOfBounds) {
          this.x = outOfBoundsRestartPosition.x
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

  resetSpeed = () => {
    // resets speed (based on acceleration)
    this.config.speedX = this.originalConfig.speedX
    this.config.speedY = this.originalConfig.speedY
  }

  handleAcceleration = () => {
    // increase/decreasing speed of fireflies bt acceleration
    this.config.speedX +=
      this.config.accelerationX *
      (this.config.accelerateInCurrentMovingDirection
        ? Math.sign(this.config.speedX)
        : 1)
    this.config.speedY +=
      this.config.accelerationY *
      (this.config.accelerateInCurrentMovingDirection
        ? Math.sign(this.config.speedY)
        : 1)
  }

  handleMove = () => {
    this.handleOutOfBoundsPositioning(
      this.appConfig.fireflies.outOfBoundsPositioningBehaviour
    )

    this.x += this.config.speedX
    this.y += this.config.speedY
  }

  update(ctx: CanvasRenderingContext2D) {
    this.handleFade()
    this.handleMove()
    this.handleAcceleration()
    if (this.rainbowMode) {
      this.somewhereOverTheRainbow()
    }

    this.draw(ctx)
  }
}
