import { ShapeFactory } from './ShapeFactory'
import { Shape } from '../shapes/Shape'
import { Freehand } from '../shapes/Freehand'

export class FreehandFactory extends ShapeFactory {
  createShape(startX: number, startY: number, endX: number, endY: number): Shape {
    const freehand = new Freehand(this.ctx, this.properties)
    freehand.addPoint(startX, startY)
    if (startX !== endX || startY !== endY) {
      freehand.addPoint(endX, endY)
    }
    return freehand
  }
}
