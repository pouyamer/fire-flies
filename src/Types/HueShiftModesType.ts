// this type is used to determine the hue shift mode method
// (see hueShiftMode in configType.ts)
type HueShiftModesType =
  // change hue based on percentage of mouse position
  | "onHorizontalMousePosition"
  | "onVerticalMousePosition"
  // change hue on pressing keys
  | "onArrowKeys"
  // no hue shift
  | "none"
