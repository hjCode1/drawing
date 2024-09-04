import { Shape } from './shapes/Shape'
import { ShapeType, ShapeProperties, EndpointShape } from './types'
import { ShapeFactoryProducer } from './factories/ShapeFactoryProducer'

export function deserializeShape(data: any, ctx: CanvasRenderingContext2D): Shape {
  const properties: ShapeProperties = {
    lineColor: data.properties.lineColor,
    fillColor: data.properties.fillColor,
    lineWidth: data.properties.lineWidth,
    lineStyle: data.properties.lineStyle,
    opacity: data.properties.opacity,
  }

  const factory = ShapeFactoryProducer.getFactory(
    data.type,
    ctx,
    properties,
    data.startShape || EndpointShape.None,
    data.endShape || EndpointShape.None
  )

  switch (data.type) {
    case ShapeType.Line:
      return factory.createShape(data.startX, data.startY, data.endX, data.endY)
    case ShapeType.Circle:
      return factory.createShape(data.centerX, data.centerY, data.centerX + data.radius, data.centerY)
    case ShapeType.Rectangle:
      return factory.createShape(data.x, data.y, data.x + data.width, data.y + data.height)
    case ShapeType.Triangle:
      return factory.createShape(data.x1, data.y1, data.x3, data.y3) // Assuming x3, y3 is the base right point
    case ShapeType.Freehand:
      const freehand = factory.createShape(data.points[0].x, data.points[0].y, data.points[0].x, data.points[0].y)
      if ('addPoints' in freehand) {
        ;(freehand as any).addPoints(data.points.slice(1))
      }
      return freehand
    default:
      throw new Error('Unknown shape type')
  }
}
