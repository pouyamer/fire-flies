const config: IConfig = {
  canvasSize: { width: innerWidth, height: innerHeight },

  rainbowMode: false,
  skyColor: {
    h: 20,
    s: 75,
    l: 0,
    a: 1
  },
  fireflies: {
    count: 3000,

    size: {
      min: 4,
      max: 50
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
