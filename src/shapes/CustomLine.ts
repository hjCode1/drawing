import { Shape } from './Shape';
import { CustomLineProperties, EndpointShape } from '../types';

export class CustomLine extends Shape {
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;
  
    constructor(ctx: CanvasRenderingContext2D, properties: CustomLineProperties, startX: number, startY: number, endX: number, endY: number) {
      super(ctx, properties);
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
    }
  
    draw(): void {
      this.applyStyles();
  
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.endX, this.endY);
      this.ctx.stroke();
  
      const customProperties = this.properties as CustomLineProperties;
      const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
      
      this.drawEndpoint(this.startX, this.startY, customProperties.startShape, angle + Math.PI);
      this.drawEndpoint(this.endX, this.endY, customProperties.endShape, angle);
  
      this.resetStyles();
    }
  
    private drawEndpoint(x: number, y: number, shape: EndpointShape, angle: number): void {
      const size = Math.max(10, this.properties.lineWidth * 3);

      switch (shape) {
        case EndpointShape.Arrow:
          this.drawArrowhead(x, y, angle, size);
          break;
        case EndpointShape.Circle:
          this.drawCircle(x, y, size / 2);
          break;
      }
    }
  
    private drawArrowhead(x: number, y: number, angle: number, size: number): void {
      const x1 = x - size * Math.cos(angle - Math.PI / 6);
      const y1 = y - size * Math.sin(angle - Math.PI / 6);
      const x2 = x - size * Math.cos(angle + Math.PI / 6);
      const y2 = y - size * Math.sin(angle + Math.PI / 6);
  
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.closePath();
      this.ctx.fillStyle = this.properties.lineColor;
      this.ctx.fill();
      this.ctx.stroke();
    }
  
    private drawCircle(x: number, y: number, radius: number): void {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.properties.lineColor;
      this.ctx.fill();
      this.ctx.stroke();
    }
  
    isPointInside(x: number, y: number): boolean {
      const threshold = Math.max(5, this.properties.lineWidth / 2);
      return this.distanceToLine(x, y, this.startX, this.startY, this.endX, this.endY) < threshold;
    }
  
    private distanceToLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;
  
      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      const param = (len_sq !== 0) ? dot / len_sq : -1;
  
      let xx, yy;
  
      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }
  
      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
  }