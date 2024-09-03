import { Canvas } from './Canvas'
import { ShapeType } from './types'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas('drawingCanvas')

  const buttons = {
    line: document.getElementById('lineBtn'),
    // arrow: document.getElementById("arrowBtn"),
    circle: document.getElementById('circleBtn'),
    rectangle: document.getElementById('rectangleBtn'),
    triangle: document.getElementById('triangleBtn'),
    freehand: document.getElementById('freehandBtn'),
    erase: document.getElementById('eraseBtn'),
    undo: document.getElementById('undoBtn'),
    redo: document.getElementById('redoBtn'),
  }

  const setActiveButton = (activeButton: HTMLElement | null) => {
    Object.values(buttons).forEach((button) => button?.classList.remove('active'))
    activeButton?.classList.add('active')
  }

  const setShape = (shape: ShapeType, button: HTMLElement | null) => {
    canvas.disableEraseMode()
    canvas.setCurrentShape(shape)
    setActiveButton(button)
  }

  buttons.line?.addEventListener('click', () => setShape(ShapeType.Line, buttons.line))
  // buttons.arrow?.addEventListener("click", () => setShape(ShapeType.Arrow, buttons.arrow));
  buttons.circle?.addEventListener('click', () => setShape(ShapeType.Circle, buttons.circle))
  buttons.rectangle?.addEventListener('click', () => setShape(ShapeType.Rectangle, buttons.rectangle))
  buttons.triangle?.addEventListener('click', () => setShape(ShapeType.Triangle, buttons.triangle))
  buttons.freehand?.addEventListener('click', () => setShape(ShapeType.Freehand, buttons.freehand))
  buttons.erase?.addEventListener('click', () => {
    canvas.toggleEraseMode()
    buttons.erase?.classList.toggle('active')
  })
  buttons.undo?.addEventListener('click', () => canvas.undo())
  buttons.redo?.addEventListener('click', () => canvas.redo())

  const lineColorPicker = document.getElementById('lineColorPicker') as HTMLInputElement
  const fillColorPicker = document.getElementById('fillColorPicker') as HTMLInputElement

  lineColorPicker?.addEventListener('input', (e) => {
    canvas.setLineColor((e.target as HTMLInputElement).value)
  })

  fillColorPicker?.addEventListener('input', (e) => {
    canvas.setFillColor((e.target as HTMLInputElement).value)
  })

  const lineWidthInput = document.getElementById('lineWidthInput') as HTMLInputElement
  lineWidthInput?.addEventListener('input', (e) => {
    canvas.setLineWidth(parseInt((e.target as HTMLInputElement).value))
  })

  const lineStyleSelect = document.getElementById('lineStyleSelect') as HTMLSelectElement
  lineStyleSelect?.addEventListener('change', (e) => {
    canvas.setLineStyle(parseInt((e.target as HTMLSelectElement).value))
  })

  const opacityInput = document.getElementById('opacityInput') as HTMLInputElement
  opacityInput?.addEventListener('input', (e) => {
    canvas.setOpacity(parseFloat((e.target as HTMLInputElement).value))
  })

  // save & load test
  const saveButton = document.getElementById('save') as HTMLInputElement
  const loadButton = document.getElementById('load') as HTMLInputElement
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
})
