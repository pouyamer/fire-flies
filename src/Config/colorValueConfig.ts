const colorValueConfig: ColorValueConfigType = {
  updateMode: "updatingLightness",
  startingMehtod: "random",
  onFadeMethod: "random",
  increasingOrDecreasingOnFade: 10,
  increasingOrDecreasingOnFadeAllValues: {
    h: 50,
    s: 5,
    l: 4,
    a: 0
  },

  singleColorValue: {
    h: 40,
    s: 85,
    l: 65,
    a: 1
  },

  hueRangeSpecification: {
    min: 0,
    max: 360
  },

  saturationRangeSpecification: {
    min: 40,
    max: 90
  },

  lightnessRangeSpecification: {
    min: 10,
    max: 81
  },

  hslColorRangeSpecification: {
    h: {
      min: 330,
      max: 360
    },
    s: {
      min: 65,
      max: 100
    },
    l: {
      min: 40,
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
