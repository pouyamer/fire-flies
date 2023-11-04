/* First Example */

// addCanvas(document.querySelector(".example-element"), true, {})

/* Second Example */
const secondConfig = {
  fireflies: {
    number: 100,
    speed: {
      min: 1,
      max: 5
    },
    size: {
      min: 10,
      max: 30
    },
    color: {
      h: 30,
      s: 85,
      l: 70,
      a: 1
    }
  },

  rainbowMode: true
}

// addCanvas(document.querySelector(".e2"), true, secondConfig)

addCanvas(document.body, true, secondConfig)
