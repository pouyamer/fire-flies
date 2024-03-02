const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 0,
    l: 20,
    a: 1
  },
  iterationsPerFrame: 3,
  wind: windConfig,

  fireflies: {
    count: 1200,

    size: {
      min: 5,
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
