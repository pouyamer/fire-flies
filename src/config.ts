const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 75,
    l: 0,
    a: 1
  },
  wind: windConfig,

  fireflies: {
    count: 5000,

    size: {
      min: 5,
      max: 30
    },

    movement: movementConfig,

    rotation: rotationConfig,

    startingPositioning: startingPositioningConfig,

    shaping: shapingConfig,

    opacityChangeOptions: opacityChangeOptionsConfig,

    colorValue: colorValueConfig,

    bounds: boundsConfig,

    outOfBounds: outOfBoundsConfig,

    hueShiftMode: "onArrowKeys"
  }
}
