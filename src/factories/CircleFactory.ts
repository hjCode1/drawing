import { ShapeFactory } from './ShapeFactory';
import { Shape } from '../shapes/Shape'
import { Circle } from '../shapes/Circle';

export class CircleFactory extends ShapeFactory {
    createShape(startX: number, startY: number, endX: number, endY: number): Shape {
      const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      return new Circle(this.ctx, this.properties, startX, startY, radius);
    }
  }

  