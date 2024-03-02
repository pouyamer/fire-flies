const colorValueConfig: ColorValueConfigType = {
  updateMode: "updatingHslColor",
  startingMehtod: {
    h: "random",
    s: "max",
    l: "min",
    a: "max"
  },
  startingMethodForColorChoices: "min",
  onFadeMethod: {
    h: "random",
    s: "random",
    l: "random",
    a: "random"
  },
  incrementOnFade: {
    h: 10,
    s: 5,
    l: 4,
    a: 0
  },

  // TODO: Later it should be implemented it changes on:
  // -- Glow
  // -- OutOfBounds
  // Also consider moving it to fadeConfig
  hslColorShouldChangeAfterFade: {
    h: true,
    s: false,
    l: false,
    a: false
  },

  hslColorChangeRange: {
    h: {
      min: 60,
      max: 80
    },
    s: {
      min: 0,
      max: 90
    },
    l: {
      min: 50,
      max: 100
    },
    a: {
      min: 1,
      max: 1
    }
  },

  weightedColorChoices: [
    // color 1:
    {
      value: {
        h: 0,
        s: 100,
        l: 70,
        a: 1
      },
      selectionWeight: 1
    },

    // color 2:
    {
      value: {
        h: 20,
        s: 100,
        l: 70,
        a: 1
      },
      selectionWeight: 2
    },

    // color 3:
    {
      value: {
        h: 50,
        s: 100,
        l: 70,
        a: 1
      },
      selectionWeight: 1
    },
    // color 4:
    {
      value: {
        h: 120,
        s: 100,
        l: 70,
        a: 1
      },
      selectionWeight: 1
    }
  ]
}
