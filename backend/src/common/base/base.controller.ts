import { BaseService } from './base.service'

export abstract class BaseController<T> {
  constructor(private readonly service: BaseService<T>) {}

  async findAll(): Promise<T[]> {
    return await this.service.findAll()
  }

  async findById(id: string) {
    return await this.service.findById(id)
  }
}
