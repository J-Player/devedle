import { Injectable } from '@nestjs/common'
import { ItemService } from '../item/item.service'
import { GameResponse } from './interfaces/game-response'
import { GameRequest } from './interfaces/game-request'
import { GameStatus } from './enums/game-status.enum'
import { Game } from './models/game'

@Injectable()
export class GameService {
  constructor(protected readonly itemService: ItemService) {}

  async playGame(gameRequest: GameRequest): Promise<GameResponse> {
    const item = await this.itemService.findById(gameRequest.original.id)
    const game = new Game(item)
    const gameResponse = await game.play(gameRequest)
    if (gameResponse.gameStatus !== GameStatus.IN_PROGRESS) {
      gameResponse.original = item
    }
    return gameResponse
  }

  async getGame(itemId: string): Promise<GameResponse> {
    const item = await this.itemService.findById(itemId)
    const game = new Game(item)
    return game.play({
      gameStatus: GameStatus.IN_PROGRESS,
      attempts: [],
      original: {
        id: item.id,
        name: null,
        imageId: item.imageId,
      },
    })
  }
}
