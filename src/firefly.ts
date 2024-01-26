class FireFly {
  canvasSize: { width: number; height: number }
  appConfig: IConfig
  config: ISingleFireflyConfig
  originalConfig: ISingleFireflyConfig
  rainbowMode: boolean
  x: number
  y: number

  // this is used when nothing is initializedYet
  initializedConfig: ISingleFireflyConfig

  indexForMultipleColorValues: number

  utilGetRandomNumberBetween = (
    range: RangeType,
    getAsInteger: boolean = false
  ) => {
    const { min, max } = range
    return getAsInteger
      ? Math.floor(Math.random() * (max - min) + min)
      : Math.random() * (max - min) + min
  }

  constructor(x: number, y: number, appConfig: IConfig) {
    this.x = x
    this.y = y
    this.appConfig = appConfig
    this.indexForMultipleColorValues = 0

    // getting range values
    const firefliesConfig = appConfig.fireflies
    const {
      size,
      speedX,
      speedY,
      fadeRate,
      jitterCoefficientX,
      jitterCoefficientY,
      accelerationX,
      accelerationY
    } = firefliesConfig

    this.initializedConfig = {
      colorValue: {
        h: 0,
        s: 0,
        l: 0,
        a: 0
      },
      shape: "circle",
      fadeRate: 0,
      jitterX: 0,
      jitterY: 0,
      opacity: 0,
      size: 0,
      sizeBehaviourWhenFading: "none",
      speedX: 0,
      speedY: 0,
      willChangeSize: false,
      accelerationX: 0,
      accelerationY: 0
    }

    this.config = this.initializedConfig

    this.config = {
      accelerationX: this.utilGetRandomNumberBetween(accelerationX),
      accelerationY: this.utilGetRandomNumberBetween(accelerationY),
      colorValue: this.determineColor(
        firefliesConfig.colorValueUpdate.mode,
        this.appConfig.fireflies.colorValueUpdate.startingMehtod
      ),
      jitterX: this.utilGetRandomNumberBetween(jitterCoefficientX),
      jitterY: this.utilGetRandomNumberBetween(jitterCoefficientY),
      sizeBehaviourWhenFading:
        Math.random() < firefliesConfig.sizeBehaviourWhenFading.frequency
          ? firefliesConfig.sizeBehaviourWhenFading.behaviorType
          : "none",
      shape: firefliesConfig.shape,
      opacity: this.determineColor(
        firefliesConfig.colorValueUpdate.mode,
        this.appConfig.fireflies.colorValueUpdate.startingMehtod
      ).a,
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
        return specification.min
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

  determineColor = (
    coloringMode: ColorValueUpdateModeType,
    determinationMethod: ColorDeterminationMethodType = "random"
  ): IHSLColor => {
    const { fireflies: firefliesConfig } = this.appConfig
    const {
      singleColorValue,
      hueRangeSpecification,
      saturationRangeSpecification,
      lightnessRangeSpecification
    } = firefliesConfig

    const { increasingOrDecreasingOnFade } =
      this.appConfig.fireflies.colorValueUpdate

    switch (coloringMode) {
      case "singleColor":
        return { ...firefliesConfig.singleColorValue }

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
        } = firefliesConfig.hslColorRangeSpecification
        const {
          h: hueIncOrDec,
          s: saturationIncOrDec,
          l: lightnessIncOrDec,
          a: alphaIncOrDec
        } = firefliesConfig.colorValueUpdate
          .increasingOrDecreasingOnFadeAllValues

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
        const { weightedColorChoices } = firefliesConfig

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
          return weightedColorChoices[i].value
        }

        if (determinationMethod === "min") {
          return weightedColorChoices[minIndex].value
        }
        if (determinationMethod === "max") {
          return weightedColorChoices[maxIndex].value
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

          return weightedColorChoices[this.indexForMultipleColorValues].value
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
    switch (this.config.shape) {
      case "circle":
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.config.size / 2, 0, 2 * Math.PI)
        ctx.moveTo(this.x, this.y)

        ctx.fill()
        return
      case "square":
        ctx.fillRect(
          this.x - this.config.size / 2,
          this.y - this.config.size / 2,
          this.config.size,
          this.config.size
        )
        return
    }
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
      this.config.colorValue = this.determineColor(
        this.appConfig.fireflies.colorValueUpdate.mode,
        this.appConfig.fireflies.colorValueUpdate.onFadeMethod
      )
    }

    this.handleFadePositioning(
      this.appConfig.fireflies.fadePositioningBehaviour
    )

    // resets the opacity to a new or original opacity
    this.config.opacity = this.appConfig.fireflies.resetFadeRateAfterFade
      ? this.utilGetRandomNumberBetween(newFadeRateAfterFade)
      : this.originalConfig.opacity

    this.config.accelerationX = this.utilGetRandomNumberBetween(
      this.appConfig.fireflies.accelerationX
    )
    this.config.accelerationY = this.utilGetRandomNumberBetween(
      this.appConfig.fireflies.accelerationY
    )
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
    const {
      newPositionAfterOutOfBounds,
      bounds: boundsConfig,
      colorValueUpdate: { mode: colorValueUpdateMode },
      hueRangeSpecification: { min: minAllowedHue, max: maxAllowedHue },
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
      this.config.colorValue.h += amount

      if (colorValueUpdateMode === "singleColor") {
        return
      }

      if (this.config.colorValue.h > maxAllowedHue) {
        this.config.colorValue.h = minAllowedHue
        return
      }

      if (this.config.colorValue.h < minAllowedHue) {
        this.config.colorValue.h = maxAllowedHue
        return
      }
    }

    const changeSizeAfterImpact = (multiplier: number) => {
      this.config.size = Math.ceil(multiplier * this.config.size)

      if (this.config.size < minAllowedSize) {
        this.config.size = maxAllowedSize
        return
      }

      if (this.config.size > maxAllowedSize) {
        this.config.size = minAllowedSize
        return
      }
    }

    const isOutOfBoundsFromLeft = this.x < -size / 2
    const isOutOfBoundsFromRight = this.x > this.canvasSize.width + size / 2
    const isOutOfBoundsFromTop = this.y < -size / 2
    const isOutOfBoundsFromBottom = this.y > this.canvasSize.height + size / 2

    const bottomEdge = this.canvasSize.height - size / 2
    const topEdge = size / 2
    const leftEdge = size / 2
    const rightEdge = this.canvasSize.width - size / 2

    const isOnTopEdge = this.y < topEdge
    const isOnBottomEdge = this.y > bottomEdge
    const isOnLeftEdge = this.x < leftEdge
    const isOnRightEdge = this.x > rightEdge

    const isOutOfBounds =
      isOutOfBoundsFromLeft ||
      isOutOfBoundsFromRight ||
      isOutOfBoundsFromTop ||
      isOutOfBoundsFromBottom

    if (isOutOfBounds && this.appConfig.fireflies.resetSpeedsAfterOutOfBounds) {
      this.resetSpeeds()
    }

    if (isOnBottomEdge && stopAtBoundBottom) {
      // ensure the position after the impact
      this.y = bottomEdge

      // impact decreases the speed and switches the directions
      this.config.speedY =
        -afterImpactSpeedMultiplierBottom * this.config.speedY

      // impact increases/decreases the hue
      increaseHueAfterImpact(hueIncreaseAmountAfterImpactBottom)

      // impact causes fireflies to shrink/grow
      changeSizeAfterImpact(sizeMultiplierAfterImpactBottom)
      return
    }

    if (isOnTopEdge && stopAtBoundTop) {
      this.y = topEdge
      this.config.speedY = -afterImpactSpeedMultiplierTop * this.config.speedY
      increaseHueAfterImpact(hueIncreaseAmountAfterImpactTop)
      changeSizeAfterImpact(sizeMultiplierAfterImpactTop)

      return
    }

    if (isOnLeftEdge && stopAtBoundLeft) {
      this.x = leftEdge
      this.config.speedX = -afterImpactSpeedMultiplierLeft * this.config.speedX
      increaseHueAfterImpact(hueIncreaseAmountAfterImpactLeft)
      changeSizeAfterImpact(sizeMultiplierAfterImpactLeft)

      return
    }

    if (isOnRightEdge && stopAtBoundRight) {
      this.x = rightEdge
      this.config.speedX = -afterImpactSpeedMultiplierRight * this.config.speedX
      increaseHueAfterImpact(hueIncreaseAmountAfterImpactRight)
      changeSizeAfterImpact(sizeMultiplierAfterImpactRight)

      return
    }

    switch (behaviour) {
      case "forceFade":
        if (isOutOfBounds) {
          this.config.opacity = 0
        }
        break
      case "continueOnOtherSide":
        // --  reset the speed after going out of bounds
        if (isOutOfBoundsFromLeft) {
          this.x = this.canvasSize.width + size / 2
          return
        }
        if (isOutOfBoundsFromRight) {
          this.x = -size / 2
          return
        }
        if (isOutOfBoundsFromTop) {
          this.y = this.canvasSize.height + size / 2
          return
        }
        if (isOutOfBoundsFromBottom) {
          this.y = -size / 2
          return
        }
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
    const { accelerateInCurrentMovingDirection } = this.appConfig.fireflies
    // increase/decreasing speed of fireflies bt acceleration
    this.config.speedX +=
      this.config.accelerationX *
      (accelerateInCurrentMovingDirection ? Math.sign(this.config.speedX) : 1)

    this.config.speedY +=
      this.config.accelerationY *
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
