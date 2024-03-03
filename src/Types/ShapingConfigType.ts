type ShapingConfigType = {
  // shape of fireflies
  shape: ShapeType

  // config for regular polygon and regular polygram shapes
  regularPolygon: {
    // (must be more than three) min and max side count of regular polygon (or regular polygram)
    sideCount: RangeType
  }
}
