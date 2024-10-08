import { Shape } from './Shape'
import { ShapeProperties, ShapeType, EndpointShape } from '../types'

export class Line extends Shape {
  protected startX: number
  protected startY: number
  protected endX: number
  protected endY: number
  // protected startShape: EndpointShape
  // protected endShape: EndpointShape

  constructor(
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    startShape: EndpointShape = EndpointShape.None,
    endShape: EndpointShape = EndpointShape.None
  ) {
    super(ctx, properties)
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
    // this.startShape = startShape
    // this.endShape = endShape
  }

  draw(): void {
    this.applyStyles()
    this.ctx.beginPath()
    this.ctx.moveTo(this.startX, this.startY)
    this.ctx.lineTo(this.endX, this.endY)
    this.ctx.stroke()
    this.resetStyles()
  }

  isPointNearEdge(x: number, y: number, threshold: number): boolean {
    return this.isPointInside(x, y)
  }

  isPointInside(x: number, y: number): boolean {
    const threshold = 5
    const distToLine =
      Math.abs(
        (this.endY - this.startY) * x -
          (this.endX - this.startX) * y +
          this.endX * this.startY -
          this.endY * this.startX
      ) / Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2))
    return distToLine < threshold
  }

  serialize(): object {
    return {
      type: this.getType(),
      properties: this.properties,
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
      // startShape: this.startShape,
      // endShape: this.endShape,
    }
  }

  getType(): ShapeType {
    return ShapeType.Line
  }
}
