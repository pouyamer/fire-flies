type ConfigType = {
  // size of the canvas
  canvasSize: { width: number; height: number }

  // true = rainbow mode, false = normal mode
  // rapidly increase the hue value over time.
  rainbowMode: boolean

  // skyColor is the color of background
  skyColor: HslColorType

  // how many times it renders per frame
  // it is used to make the simulation
  // more realistic
  iterationsPerFrame: number

  // EXPERIMENTAL: wind config
  // wind affects all the fireflies
  wind: WindConfigType

  // this is a genearal config for all fireflies
  // it is used to pick the config for each
  // individual firefly later on
  fireflies: {
    // Number of fireflies on the screen
    count: number

    // Size Range of butterflies
    size: RangeType

    // Config for Speed, Acceleration and jitter
    movement: MovementConfigType

    // Config for:
    // - rotaion speed
    // - rotation acceleration
    rotation: RotationConfigType

    // Config for:
    //  - How position of each firefly is set
    //  once the app runs
    startingPositioning: StartingPositioningConfigType

    // Config for:
    // - Fading (opacity 1 -> 0)
    // - Glowing (opacity 0 -> 1)
    opacityChangeOptions: OpacityChangeOptionsConfigType

    // Config for:
    // - How the color value changes
    colorValue: ColorValueConfigType

    // Config for:
    // - Shape of Fireflies
    shaping: ShapingConfigType

    // Config for:
    // - How the bounds affect the fireflies
    bounds: BoundsConfigType

    // Config for:
    // - How the fireflies behave when they get out of bounds
    // (if bounds are disabled)
    outOfBounds: OutOfBoundsConfigType

    // A mode that utilizes the event listeners
    // to add to the hues when user drags the mouse,
    // or presses a key down
    hueShiftMode: HueShiftModesType
  }
}
