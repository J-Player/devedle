import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { GameService } from './game.service'
import { GameRequest } from './interfaces/game-request'

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('play')
  async play(@Body() gameRequest: GameRequest) {
    return await this.gameService.playGame(gameRequest)
  }

  @Get(':itemId')
  async getGame(@Param('itemId') itemId: string) {
    return await this.gameService.getGame(itemId)
  }
}
