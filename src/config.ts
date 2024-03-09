/* To see the documentation for config file 
   and to better understand it go and read the
   ConfigType.ts file
   and each file, see its respective type
*/
const config: ConfigType = {
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
    count: 1000,

    size: {
      min: 10,
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
