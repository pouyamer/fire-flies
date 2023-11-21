/* First Example */

// addCanvas(document.querySelector(".example-element"), true, {})

/* Second Example */
const secondConfig = {
  skyColor: {
    h: 240,
    s: 100,
    l: 0,
    a: 1
  },
  fireflies: {
    number: 120,
    size: {
      min: 3,
      max: 10
    },
    color: {
      h: 0,
      s: 75,
      l: 60,
      a: 1
    }
  },

  rainbowMode: false
}

// addCanvas(document.querySelector(".e2"), true, secondConfig)

addCanvas(document.body, true, secondConfig)
