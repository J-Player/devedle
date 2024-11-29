import { Item } from 'src/modules/item/entities/item.entity'
import { GameRequest } from '../interfaces/game-request'
import { GameResponse } from '../interfaces/game-response'
import { GameStatus } from '../enums/game-status.enum'
import { Attempt } from '../interfaces/attempt'

export class Game {
  maxAttempts: number = 6

  constructor(public item: Item) {}

  async play(gameRequest: GameRequest): Promise<GameResponse> {
    const { attempts, original } = gameRequest
    return {
      gameStatus: this.updateGameStatus(attempts),
      attempts: attempts,
      maxAttempts: this.maxAttempts,
      original: {
        ...original,
      },
    }
  }

  updateGameStatus(attempt: Attempt[]) {
    const lastAttempt = attempt.at(-1)
    if (lastAttempt?.id === this.item.id) {
      return GameStatus.WON
    } else if (attempt.length >= this.maxAttempts) {
      return GameStatus.LOSE
    } else {
      return GameStatus.IN_PROGRESS
    }
  }
}
