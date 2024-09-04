import { ShapeFactory } from './ShapeFactory'
import { CustomLine } from '../shapes/CustomLine'
import { Shape } from '../shapes/Shape'
import { ShapeProperties, EndpointShape, CustomLineProperties } from '../types'
import { Line } from '../shapes/Line'

export class LineFactory extends ShapeFactory {
  private startShape: EndpointShape
  private endShape: EndpointShape

  constructor(
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    startShape: EndpointShape,
    endShape: EndpointShape
  ) {
    super(ctx, properties)
    this.startShape = startShape
    this.endShape = endShape
  }

  createShape(startX: number, startY: number, endX: number, endY: number): Shape {
    if (this.startShape !== EndpointShape.None || this.endShape !== EndpointShape.None) {
      const customProperties: CustomLineProperties = {
        ...this.properties,
        startShape: this.startShape,
        endShape: this.endShape,
      }
      return new CustomLine(this.ctx, customProperties, startX, startY, endX, endY)
    } else {
      return new Line(this.ctx, this.properties, startX, startY, endX, endY)
    }
  }
}
