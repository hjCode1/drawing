export enum ShapeType {
  Line,
  // Arrow,
  Circle,
  Rectangle,
  Triangle,
  Freehand,
}

export enum LineStyle {
  Solid,
  Dashed,
}

export enum EndpointShape {
  None = 'none',
  Arrow = 'arrow',
  Circle = 'circle',
}

export interface ShapeProperties {
  lineColor: string
  fillColor: string
  lineWidth: number
  lineStyle: LineStyle
  opacity: number
}

export interface CustomLineProperties extends ShapeProperties {
  startShape: EndpointShape
  endShape: EndpointShape
}
