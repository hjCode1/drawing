import { ShapeFactory } from './ShapeFactory';
import { Shape } from '../shapes/Shape'
import { Rectangle } from '../shapes/Rectangle';

export class RectangleFactory extends ShapeFactory {
  createShape(startX: number, startY: number, endX: number, endY: number): Shape {
    return new Rectangle(this.ctx, this.properties, startX, startY, endX - startX, endY - startY);
  }
}
