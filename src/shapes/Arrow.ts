// import { Shape } from './Shape';
// import { ShapeProperties } from '../types';

// export class Arrow extends Shape {
//     private startX: number;
//     private startY: number;
//     private endX: number;
//     private endY: number;
//     private arrowSize: number;
  
//     constructor(ctx: CanvasRenderingContext2D, properties: ShapeProperties, startX: number, startY: number, endX: number, endY: number) {
//       super(ctx, properties);
//       this.startX = startX;
//       this.startY = startY;
//       this.endX = endX;
//       this.endY = endY;
//       this.arrowSize = Math.max(10, this.properties.lineWidth * 3);
//     }
     
  
//     draw(): void {
//       this.applyStyles();
  
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.startX, this.startY);
//       this.ctx.lineTo(this.endX, this.endY);
//       this.ctx.stroke();
  
//       const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
  
//       const x1 = this.endX - this.arrowSize * Math.cos(angle - Math.PI / 6);
//       const y1 = this.endY - this.arrowSize * Math.sin(angle - Math.PI / 6);
//       const x2 = this.endX - this.arrowSize * Math.cos(angle + Math.PI / 6);
//       const y2 = this.endY - this.arrowSize * Math.sin(angle + Math.PI / 6);
  
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.endX, this.endY);
//       this.ctx.lineTo(x1, y1);
//       this.ctx.lineTo(x2, y2);
//       this.ctx.closePath();
      
//       this.ctx.fillStyle = this.properties.lineColor;
//       this.ctx.fill();
//       this.ctx.stroke();
  
//       this.resetStyles();
//     }
  
//     isPointInside(x: number, y: number): boolean {
//       const threshold = Math.max(5, this.properties.lineWidth / 2);
      
//       const distToLine = this.distanceToLine(x, y, this.startX, this.startY, this.endX, this.endY);
//       if (distToLine < threshold) return true;
      
//       const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
//       const x1 = this.endX - this.arrowSize * Math.cos(angle - Math.PI / 6);
//       const y1 = this.endY - this.arrowSize * Math.sin(angle - Math.PI / 6);
//       const x2 = this.endX - this.arrowSize * Math.cos(angle + Math.PI / 6);
//       const y2 = this.endY - this.arrowSize * Math.sin(angle + Math.PI / 6);
      
//       return this.isPointInTriangle(x, y, this.endX, this.endY, x1, y1, x2, y2);
//     }
  
//     private distanceToLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
//       const A = x - x1;
//       const B = y - y1;
//       const C = x2 - x1;
//       const D = y2 - y1;
  
//       const dot = A * C + B * D;
//       const len_sq = C * C + D * D;
//       const param = (len_sq !== 0) ? dot / len_sq : -1;
  
//       let xx, yy;
  
//       if (param < 0) {
//         xx = x1;
//         yy = y1;
//       } else if (param > 1) {
//         xx = x2;
//         yy = y2;
//       } else {
//         xx = x1 + param * C;
//         yy = y1 + param * D;
//       }
  
//       const dx = x - xx;
//       const dy = y - yy;
//       return Math.sqrt(dx * dx + dy * dy);
//     }
  
//     private isPointInTriangle(px: number, py: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): boolean {
//       const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
//       const area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
//       const area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
//       const area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
//       return Math.abs(area1 + area2 + area3 - areaOrig) < 0.01;
//     }
//   }