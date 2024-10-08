import { Shape } from './Shape'
import { ShapeProperties, ShapeType } from '../types'

export class Circle extends Shape {
  private centerX: number
  private centerY: number
  private radius: number

  constructor(
    ctx: CanvasRenderingContext2D,
    properties: ShapeProperties,
    centerX: number,
    centerY: number,
    radius: number
  ) {
    super(ctx, properties)
    this.centerX = centerX
    this.centerY = centerY
    this.radius = radius
  }

  draw(): void {
    this.applyStyles()
    this.ctx.beginPath()
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.stroke()
    this.resetStyles()
  }

  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt(Math.pow(x - this.centerX, 2) + Math.pow(y - this.centerY, 2))
    return distance <= this.radius
  }

  isPointNearEdge(x: number, y: number, threshold: number): boolean {
    const distance = Math.sqrt(Math.pow(x - this.centerX, 2) + Math.pow(y - this.centerY, 2))
    return Math.abs(distance - this.radius) <= threshold
  }

  serialize(): object {
    return {
      type: ShapeType.Circle,
      properties: this.properties,
      centerX: this.centerX,
      centerY: this.centerY,
      radius: this.radius,
    }
  }

  getType(): ShapeType {
    return ShapeType.Circle
  }
}
