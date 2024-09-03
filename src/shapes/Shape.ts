import { LineStyle, ShapeProperties } from '../types'

// 모든 도형의 기본이 되는 추상 클래스
export abstract class Shape {
  protected ctx: CanvasRenderingContext2D
  protected properties: ShapeProperties

  constructor(ctx: CanvasRenderingContext2D, properties: ShapeProperties) {
    this.ctx = ctx
    this.properties = { ...properties }
  }

  abstract draw(): void
  abstract isPointInside(x: number, y: number): boolean

  protected applyStyles(): void {
    this.ctx.strokeStyle = this.properties.lineColor
    this.ctx.fillStyle = this.properties.fillColor
    this.ctx.lineWidth = this.properties.lineWidth
    this.ctx.globalAlpha = this.properties.opacity
    this.ctx.setLineDash(this.properties.lineStyle === LineStyle.Dashed ? [20, 5] : [])
  }

  protected resetStyles(): void {
    this.ctx.globalAlpha = 1
    this.ctx.setLineDash([])
  }
}
