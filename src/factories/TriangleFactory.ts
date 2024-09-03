import { ShapeFactory } from './ShapeFactory'
import { Shape } from '../shapes/Shape'
import { Triangle } from '../shapes/Triangle'

export class TriangleFactory extends ShapeFactory {
  createShape(startX: number, startY: number, endX: number, endY: number): Shape {
    const centerX = (startX + endX) / 2
    return new Triangle(this.ctx, this.properties, startX, endY, centerX, startY, endX, endY)
  }
}
