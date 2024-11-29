import { Controller, Get, Param } from '@nestjs/common'
import { ItemService } from './item.service'
import { BaseController } from '../../common/base/base.controller'
import { Item } from './entities/item.entity'

@Controller('items')
export class ItemController extends BaseController<Item> {
  constructor(protected readonly itemService: ItemService) {
    super(itemService)
  }

  @Get('all')
  async findAll() {
    return this.itemService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.itemService.findById(id)
  }
}
