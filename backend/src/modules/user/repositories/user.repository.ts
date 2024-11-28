import { Repository } from 'typeorm'
import { UserBaseRepository } from './user.base.repository'
import { User } from '../entities/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { USER_REPOSITORY } from '../providers/user.providers'

@Injectable()
export class UserRepository implements UserBaseRepository {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id } })
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOne({ where: { username } })
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find()
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user)
  }

  async update(id: string, user: User): Promise<User> {
    await this.repository.update(id, user)
    return await this.repository.findOne({ where: { id } })
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
