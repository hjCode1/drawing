import { Shape } from './Shape'
import { ShapeProperties } from '../types'

export class Triangle extends Shape {
  private x1: number
  private y1: number
  private x2: number
  private y2: number
  private x3: number
  private y3: number

  constructor(
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    super(ctx, properties)
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.x3 = x3
    this.y3 = y3
  }

  draw(): void {
    this.applyStyles()
    this.ctx.beginPath()
    this.ctx.moveTo(this.x1, this.y1)
    this.ctx.lineTo(this.x2, this.y2)
    this.ctx.lineTo(this.x3, this.y3)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    this.resetStyles()
  }

  isPointInside(x: number, y: number): boolean {
    // 먼저 점이 삼각형의 경계 상자 안에 있는지 확인하세요.
    const minX = Math.min(this.x1, this.x2, this.x3)
    const maxX = Math.max(this.x1, this.x2, this.x3)
    const minY = Math.min(this.y1, this.y2, this.y3)
    const maxY = Math.max(this.y1, this.y2, this.y3)

    if (x < minX || x > maxX || y < minY || y > maxY) {
      return false
    }

    // 무게 중심 좌표를 기반으로 하는 "삼각형의 점" 알고리즘을 사용합니다.
    const denominator = (this.y2 - this.y3) * (this.x1 - this.x3) + (this.x3 - this.x2) * (this.y1 - this.y3)
    const a = ((this.y2 - this.y3) * (x - this.x3) + (this.x3 - this.x2) * (y - this.y3)) / denominator
    const b = ((this.y3 - this.y1) * (x - this.x3) + (this.x1 - this.x3) * (y - this.y3)) / denominator
    const c = 1 - a - b

    // a, b, c가 모두 0과 1 사이이면 점이 삼각형 내부에 있는 것입니다.
    return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1
  }

  isPointNearEdge(x: number, y: number, threshold: number): boolean {
    const distToEdge1 = this.distanceToLine(x, y, this.x1, this.y1, this.x2, this.y2)
    const distToEdge2 = this.distanceToLine(x, y, this.x2, this.y2, this.x3, this.y3)
    const distToEdge3 = this.distanceToLine(x, y, this.x3, this.y3, this.x1, this.y1)

    return Math.min(distToEdge1, distToEdge2, distToEdge3) <= threshold
  }

  private distanceToLine(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const A = px - x1
    const B = py - y1
    const C = x2 - x1
    const D = y2 - y1

    const dot = A * C + B * D
    const lenSq = C * C + D * D
    const param = lenSq !== 0 ? dot / lenSq : -1

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

    const dx = px - xx
    const dy = py - yy
    return Math.sqrt(dx * dx + dy * dy)
  }
}
