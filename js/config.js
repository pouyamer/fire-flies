const config = {
  canvasSize: { width: innerWidth, height: innerHeight },
  opacityDecay: 0.005, // rate of opacity decay
  rainbowMode: false, // true = rainbow mode, false = normal mode
  skyColor: {
    h: 0,
    s: 0,
    l: 0,
    a: 1
  },
  fireflies: {
    speed: {
      min: 0.1,
      max: 2
    },
    number: 100, // Number of fireflies
    size: {
      min: 2,
      max: 7
    },
    color: {
      h: 60,
      s: 95,
      l: 80,
      a: 1
    }
  }
}
