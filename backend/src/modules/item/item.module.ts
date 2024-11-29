import { Module } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemController } from './item.controller'
import { Item } from './entities/item.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemRepository } from './repositories/item.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService],
})
export class ItemModule {}
