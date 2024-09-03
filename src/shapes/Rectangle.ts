import { Shape } from './Shape'
import { ShapeProperties } from '../types'

export class Rectangle extends Shape {
  private x: number
  private y: number
  private width: number
  private height: number

  constructor(
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(ctx, properties)
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw(): void {
    this.applyStyles()
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.width, this.height)
    this.ctx.fill()
    this.ctx.stroke()
    this.resetStyles()
  }

  isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  isPointNearEdge(x: number, y: number, threshold: number): boolean {
    const nearLeft = Math.abs(x - this.x) <= threshold
    const nearRight = Math.abs(x - (this.x + this.width)) <= threshold
    const nearTop = Math.abs(y - this.y) <= threshold
    const nearBottom = Math.abs(y - (this.y + this.height)) <= threshold

    return (
      ((nearLeft || nearRight) && y >= this.y && y <= this.y + this.height) ||
      ((nearTop || nearBottom) && x >= this.x && x <= this.x + this.width)
    )
  }
}
