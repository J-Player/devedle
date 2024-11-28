import { User } from '../entities/user.entity'
import { UserBaseRepository } from './user.base.repository'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UserInMemoryRepository implements UserBaseRepository {
  private static users: User[] = []

  async findIndexById(id: string): Promise<number> {
    return UserInMemoryRepository.users.findIndex((user) => user.id === id)
  }

  async findById(id: string): Promise<User> {
    return UserInMemoryRepository.users.find((user) => user.id === id)
  }

  async findByUsername(username: string): Promise<User> {
    return UserInMemoryRepository.users.find(
      (user) => user.username === username,
    )
  }

  async findAll(): Promise<User[]> {
    return UserInMemoryRepository.users
  }

  async save(user: User): Promise<User> {
    UserInMemoryRepository.users.push(user)
    return user
  }

  async update(id: string, user: User): Promise<User> {
    const index = await this.findIndexById(id)
    if (index === -1) {
      throw new BadRequestException(`User not found`)
    }
    UserInMemoryRepository.users[index] = user
    return user
  }

  async delete(id: string): Promise<void> {
    const index = await this.findIndexById(id)
    if (index === -1) {
      throw new BadRequestException(`User not found`)
    }
    UserInMemoryRepository.users.splice(index, 1)
  }
}
