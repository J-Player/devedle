import { GameStatus } from '../enums/game-status.enum'
import { Item } from './item'

export interface Game {
  readonly gameStatus: GameStatus
  readonly attempts: (Item | null)[]
  readonly original: Partial<Item>
  readonly maxAttempts?: number
}
