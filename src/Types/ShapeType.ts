type ShapeType =
  | "circle"
  | "square"

  // In Euclidean geometry, a regular polygon is a polygon that is
  // - direct equiangular (all angles are equal in measure)
  // - equilateral (all sides have the same length).
  // source: wikipedia
  | "regularPolygon"

  // shapes like stars etc.
  | "regularPolygram"

  // 1/4 of a circle (EXPERIMENTAL)
  | "quarterCircle"
