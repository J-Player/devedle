import { Item } from 'src/modules/item/entities/item.entity'
import { Attempt } from './attempt'
import { GameStatus } from '../enums/game-status.enum'

export interface GameRequest {
  gameStatus: GameStatus
  attempts: Attempt[]
  original: Partial<Item>
}
