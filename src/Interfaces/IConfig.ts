interface IConfig {
  canvasSize: { width: number; height: number }

  rainbowMode: boolean // true = rainbow mode, false = normal mode
  skyColor: IHSLColor

  wind: WindConfigType
  fireflies: {
    // Number of fireflies
    count: number

    // Size Range of butterflies
    size: RangeType
    movement: MovementConfigType
    /* ===== Rotation ===== */
    rotation: RotationConfigType

    /* =================== */

    startingPositioning: StartingPositioningConfigType

    opacityChangeOptions: OpacityChangeOptionsConfigType
    /* =============================== Coloring Mode ========================================== */

    // TODO: Add the singleColorValue - weightedColorChoices to colorValueUpdate
    colorValue: ColorValueConfigType

    /* ========================================================================================*/

    shaping: ShapingConfigType

    // bounds behaviour
    bounds: BoundsConfigType

    // outofbounds behaviour
    outOfBounds: OutOfBoundsConfigType
    // if true: the decayAmount gets new random value when a firefly opacity reaches zero

    hueShiftMode: HueShiftModes
  }
}
