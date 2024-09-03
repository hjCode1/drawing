import { Shape } from '../shapes/Shape'
import { ShapeProperties } from '../types'

export abstract class ShapeFactory {
  protected ctx: CanvasRenderingContext2D
  protected properties: ShapeProperties

  constructor(ctx: CanvasRenderingContext2D, properties: ShapeProperties) {
    this.ctx = ctx
    this.properties = properties
  }

  abstract createShape(startX: number, startY: number, endX: number, endY: number): Shape
}
