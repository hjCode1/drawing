import { ShapeFactory } from './ShapeFactory'
import { LineFactory } from './LineFactory'
// import { ArrowFactory } from './ArrowFactory';
import { CircleFactory } from './CircleFactory'
import { RectangleFactory } from './RectangleFactory'
import { TriangleFactory } from './TriangleFactory'
import { FreehandFactory } from './FreehandFactory'
import { ShapeType, ShapeProperties, EndpointShape } from '../types'

export class ShapeFactoryProducer {
  static getFactory(
    shapeType: ShapeType,
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    startShape: EndpointShape,
    endShape: EndpointShape
  ): ShapeFactory {
    switch (shapeType) {
      case ShapeType.Line:
        return new LineFactory(ctx, properties, startShape, endShape)
      // return new LineFactory(ctx, properties, startShape || EndpointShape.None, endShape || EndpointShape.None)
      // case ShapeType.Arrow:
      //   return new ArrowFactory(ctx, properties);
      case ShapeType.Circle:
        return new CircleFactory(ctx, properties)
      case ShapeType.Rectangle:
        return new RectangleFactory(ctx, properties)
      case ShapeType.Triangle:
        return new TriangleFactory(ctx, properties)
      case ShapeType.Freehand:
        return new FreehandFactory(ctx, properties)
      default:
        throw new Error('Unsupported shape type')
    }
  }
}
