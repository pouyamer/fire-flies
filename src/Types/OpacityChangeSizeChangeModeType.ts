// How the size changes after fade (or glow)
type OpacityChangeSizeChangeModeType =
  // size -> 0
  | "shrink"
  // size -> maxSize
  | "grow"
  // size -> size (nothing changes)
  | "none"
