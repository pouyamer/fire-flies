type ShapingConfigType = {
  shape: ShapeType

  // config for regular polygon shape
  regularPolygon: {
    // must be more than three
    sideCount: RangeType
  }
}
