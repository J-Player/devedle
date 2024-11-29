import { BaseRepository } from './base.repository'

export class BaseService<T> {
  constructor(private readonly repository: BaseRepository<T>) {}
  async findById(id: string): Promise<T> {
    return this.repository.findById(id)
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll()
  }
}
