const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 0,
    l: 0,
    a: 1
  },
  iterationsPerFrame: 3,
  wind: windConfig,

  fireflies: {
    count: 500,

    size: {
      min: 10,
      max: 12
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
