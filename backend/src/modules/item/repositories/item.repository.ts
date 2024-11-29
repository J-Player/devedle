import { Repository } from 'typeorm'
import { Item } from '../entities/item.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'src/common/base/base.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ItemRepository implements BaseRepository<Item> {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findById(id: string): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } })
  }

  async findByName(name: string): Promise<Item> {
    return await this.itemRepository.findOne({ where: { name } })
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find()
  }

  async save(item: Item): Promise<Item> {
    return await this.itemRepository.save(item)
  }

  async update(id: string, item: Item): Promise<Item> {
    await this.itemRepository.update(id, item)
    return await this.itemRepository.findOne({ where: { id } })
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id)
  }
}
