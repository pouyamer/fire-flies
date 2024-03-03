// Method used to determine the color of fireflies:
type ColorDeterminationMethodType =
  // min value (set on ColorValueConfig file)
  | "min"
  // max value (set on ColorValueConfig file)
  | "max"
  // random value between the max and min values (set on ColorValueConfig file)
  | "random"
  // it increases or decreases it by the value (incrementOnFade for example on ColorValueConfig file)
  | "increasing"
  | "decreasing"
