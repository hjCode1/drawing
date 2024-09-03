import { ShapeFactory } from './ShapeFactory'
import { Shape } from '../shapes/Shape'
import { Freehand } from '../shapes/Freehand'

export class FreehandFactory extends ShapeFactory {
  createShape(startX: number, startY: number, endX: number, endY: number): Shape {
    return new Freehand(this.ctx, { ...this.properties })
  }
}
