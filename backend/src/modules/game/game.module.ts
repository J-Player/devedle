import { Module } from '@nestjs/common'
import { GameService } from './game.service'
import { GameController } from './game.controller'
import { ItemModule } from '../item/item.module'

@Module({
  imports: [ItemModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
