import { Injectable } from '@nestjs/common'
import { ItemRepository } from './repositories/item.repository'
import { BaseService } from '../../common/base/base.service'
import { Item } from './entities/item.entity'

@Injectable()
export class ItemService extends BaseService<Item> {
  constructor(protected itemRepository: ItemRepository) {
    super(itemRepository)
  }
}
