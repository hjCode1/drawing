import { Shape } from './shapes/Shape'

export type Action = {
  type: 'add' | 'delete'
  shapes: Shape[]
}

export class HistoryManager {
  private undoStack: Action[] = []
  private redoStack: Action[] = []

  addAction(action: Action): void {
    this.undoStack.push(action)
    this.redoStack = [] // 새 동작이 추가되면 redo 스택을 초기화
  }

  undo(): Action | null {
    if (this.undoStack.length > 0) {
      const action = this.undoStack.pop()!
      this.redoStack.push(this.reverseAction(action))
      return action
    }
    return null
  }

  redo(): Action | null {
    if (this.redoStack.length > 0) {
      const action = this.redoStack.pop()!
      this.undoStack.push(this.reverseAction(action))
      return action
    }
    return null
  }

  private reverseAction(action: Action): Action {
    return {
      type: action.type === 'add' ? 'delete' : 'add',
      shapes: [...action.shapes],
    }
  }
}
