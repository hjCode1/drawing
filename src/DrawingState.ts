import { ShapeType, ShapeProperties, LineStyle } from './types';

export class DrawingState {
    currentShape: ShapeType;
    properties: ShapeProperties;
  
    constructor() {
      this.currentShape = ShapeType.Line;
      this.properties = {
        lineColor: "#000000",
        fillColor: "transparent",
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        opacity: 1
      };
    }
  }