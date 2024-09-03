import { Shape } from './Shape'
import { ShapeProperties } from '../types'

// 자유 곡선 클래스
export class Freehand extends Shape {
  private points: { x: number; y: number }[] = []

  constructor(ctx: CanvasRenderingContext2D, properties: ShapeProperties) {
    super(ctx, { ...properties })
  }

  addPoint(x: number, y: number): void {
    this.points.push({ x, y })
  }

  draw(): void {
    if (this.points.length < 2) return

    this.applyStyles()

    this.ctx.beginPath()
    this.ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    this.ctx.stroke()

    this.resetStyles()
  }

  isPointInside(x: number, y: number): boolean {
    const threshold = Math.max(5, this.properties.lineWidth / 2)
    for (let i = 1; i < this.points.length; i++) {
      if (
        this.distanceToLine(x, y, this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y) <
        threshold
      ) {
        return true
      }
    }
    return false
    // const threshold = Math.max(5, this.properties.lineWidth / 2);
    // for (const point of this.points) {
    //   if (
    //     Math.abs(x - point.x) < threshold &&
    //     Math.abs(y - point.y) < threshold
    //   ) {
    //     return true;
    //   }
    // }
    // return false;
  }

  private distanceToLine(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
    const A = x - x1
    const B = y - y1
    const C = x2 - x1
    const D = y2 - y1

    const dot = A * C + B * D
    const len_sq = C * C + D * D
    const param = len_sq !== 0 ? dot / len_sq : -1

    let xx, yy

    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 1) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }

    const dx = x - xx
    const dy = y - yy
    return Math.sqrt(dx * dx + dy * dy)
  }
}
