import { Shape } from './shapes/Shape';
import { Freehand } from './shapes/Freehand';
import { Triangle } from './shapes/Triangle';
import { DrawingState } from './DrawingState';
import { HistoryManager, Action } from './HistoryManager';
import { ShapeFactoryProducer } from './factories/ShapeFactoryProducer';
import { ShapeFactory } from './factories/ShapeFactory';
import { ShapeType, EndpointShape, LineStyle } from './types';

export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private drawingState: DrawingState;
    private shapes: Shape[] = [];
    private isDrawing: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    private isErasing: boolean = false;
    private currentShape: Shape | null = null;
    private historyManager: HistoryManager;
    private lineStartShape: EndpointShape = EndpointShape.None;
    private lineEndShape: EndpointShape = EndpointShape.None;
    private shapeFactory: ShapeFactory;
  
    constructor(canvasId: string) {
      this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d")!;
      this.drawingState = new DrawingState();
      this.historyManager = new HistoryManager();
      this.shapeFactory = ShapeFactoryProducer.getFactory(
        this.drawingState.currentShape,
        this.ctx,
        this.drawingState.properties,
        this.lineStartShape,
        this.lineEndShape
      );
  
      this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
      this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
      this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
  
      this.setupLineOptions();
    }
  
    setCurrentShape(shape: ShapeType): void {
      this.drawingState.currentShape = shape;
      this.updateShapeFactory();
  
      const lineOptions = document.getElementById('lineOptions');
  
      if (lineOptions) {
        lineOptions.style.display = shape === ShapeType.Line ? 'block' : 'none';
      }
    }
  
    private updateShapeFactory(): void {
      this.shapeFactory = ShapeFactoryProducer.getFactory(
        this.drawingState.currentShape,
        this.ctx,
        this.drawingState.properties,
        this.lineStartShape,
        this.lineEndShape
      );
    }

    saveState(): string {
      return this.canvas.toDataURL();
    }

    loadState(dataURL: string): void {
      const img = new Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
        
        // 모양 배열 및 기록 지우기
        this.shapes = [];
        this.historyManager = new HistoryManager();
      };
      img.src = dataURL;
    }
  
    setLineColor(color: string): void {
      this.drawingState.properties.lineColor = color;
    }
  
    setFillColor(color: string): void {
      this.drawingState.properties.fillColor = color;
    }
  
    setLineWidth(width: number): void {
      this.drawingState.properties.lineWidth = width;
    }
  
    setLineStyle(style: LineStyle): void {
      this.drawingState.properties.lineStyle = style;
    }
  
    setOpacity(opacity: number): void {
      this.drawingState.properties.opacity = opacity;
    }
  
    toggleEraseMode(): void {
      this.isErasing = !this.isErasing;
    }
  
    disableEraseMode(): void {
      this.isErasing = false;
    }

    undo(): void {
      const action = this.historyManager.undo();
      if (action) {
        this.applyAction(action);
        this.redrawShapes();
      }
    }
  
    redo(): void {
      const action = this.historyManager.redo();
      if (action) {
        this.applyAction(action);
        this.redrawShapes();
      }
    }
  
    private createShape(startX: number, startY: number, endX: number, endY: number): Shape {
      return this.shapeFactory.createShape(startX, startY, endX, endY);
    }
    
    private handleMouseDown(event: MouseEvent): void {
      this.isDrawing = true;
      
      const rect = this.canvas.getBoundingClientRect()
      this.startX = event.clientX - rect.left;
      this.startY = event.clientY - rect.top;
      
      if (this.isErasing) {
        this.eraseAtPoint(this.startX, this.startY);
      } else if (this.drawingState.currentShape === ShapeType.Freehand) {
        this.currentShape = this.createShape(this.startX, this.startY, this.startX, this.startY) as Freehand;
        (this.currentShape as Freehand).addPoint(this.startX, this.startY);
      }
    }
  
    private handleMouseMove(event: MouseEvent): void {
      if (!this.isDrawing) return;
  
      const rect = this.canvas.getBoundingClientRect()
      const endX = event.clientX - rect.left;
      const endY = event.clientY - rect.top;
  
      if (this.isErasing) {
        this.eraseAtPoint(endX, endY);
      } else if (this.drawingState.currentShape === ShapeType.Freehand && this.currentShape) {
        (this.currentShape as Freehand).addPoint(endX, endY);
        this.redrawShapes();
        this.currentShape.draw();
      } else {
        this.redrawShapes();
        const tempShape = this.createShape(this.startX, this.startY, endX, endY);
        tempShape.draw();
      }
    }
  
    private handleMouseUp(event: MouseEvent): void {
      if (!this.isDrawing) return;
  
      const rect = this.canvas.getBoundingClientRect()
      const endX = event.clientX - rect.left;
      const endY = event.clientY - rect.top;
  
      if (!this.isErasing) {
        if (!this.currentShape) {
          this.currentShape = this.createShape(this.startX, this.startY, endX, endY);
        }
        this.shapes.push(this.currentShape);
        this.historyManager.addAction({ type: "add", shapes: [this.currentShape] });
      }
  
      this.redrawShapes();
      this.isDrawing = false;
      this.currentShape = null;
    }
  
  
    private eraseAtPoint(x: number, y: number): void {
      const eraserThreshold = Math.max(5, this.drawingState.properties.lineWidth / 2);
      const erasedShapes: Shape[] = [];
    
      for (let i = this.shapes.length - 1; i >= 0; i--) {
        const shape = this.shapes[i];
        if (shape instanceof Triangle) {
          if (shape.isPointInside(x, y) || shape.isPointNearEdge(x, y, eraserThreshold)) {
            erasedShapes.push(this.shapes.splice(i, 1)[0]);
          }
        } else if (shape.isPointInside(x, y)) {
          erasedShapes.push(this.shapes.splice(i, 1)[0]);
        }
      }
    
      if (erasedShapes.length > 0) {
        this.historyManager.addAction({ type: "delete", shapes: erasedShapes });
        this.redrawShapes();
      }
    }
  
    private applyAction(action: Action): void {
      if (action.type === "add") {
        this.shapes = this.shapes.filter(shape => !action.shapes.includes(shape));
      } else {
        this.shapes.push(...action.shapes);
      }
    }
  
    private redrawShapes(): void {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (const shape of this.shapes) {
        shape.draw();
      }
    }
    
    private setupLineOptions(): void {
      const lineStartSelect = document.getElementById('lineStartShape') as HTMLSelectElement;
      const lineEndSelect = document.getElementById('lineEndShape') as HTMLSelectElement;
    
      lineStartSelect.addEventListener('change', (e) => {
        this.lineStartShape = (e.target as HTMLSelectElement).value as EndpointShape;
        this.updateShapeFactory();
      });
    
      lineEndSelect.addEventListener('change', (e) => {
        this.lineEndShape = (e.target as HTMLSelectElement).value as EndpointShape;
        this.updateShapeFactory();
      });
    }
  }
  