/* First Example */

// addCanvas(document.querySelector(".example-element"), true, {})

/* Second Example */
const secondConfig = {
  skyColor: {
    h: 240,
    s: 100,
    l: 2,
    a: 1
  },
  fireflies: {
    number: 100,
    speed: {
      min: 3,
      max: 5
    },
    size: {
      min: 3,
      max: 20
    },
    color: {
      h: 240,
      s: 100,
      l: 80,
      a: 1
    }
  },

  rainbowMode: true
}

// addCanvas(document.querySelector(".e2"), true, secondConfig)

addCanvas(document.body, true, secondConfig)
