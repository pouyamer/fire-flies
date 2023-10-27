addCanvas(document.querySelector(".example-element"), true, {})

const secondConfig = {
  opacityDecay: 0.025,
  fireflies: {
    number: 500,
    speed: {
      min: 1,
      max: 10
    },
    size: {
      min: 5,
      max: 10
    },
    color: {
      h: 10,
      s: 100,
      l: 65,
      a: 1
    }
  },

  rainbowMode: true
}

addCanvas(document.querySelector(".e2"), true, secondConfig)
