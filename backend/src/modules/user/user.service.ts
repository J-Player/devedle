import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserBaseRepository } from './repositories/user.base.repository'
import { UserMapper } from './mappers/user.mapper'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserBaseRepository) {}

  save(createUserDto: CreateUserDto) {
    const user = UserMapper.toEntity(createUserDto)
    return this.userRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id)
  }

  findByUsername(username: string) {
    return this.userRepository.findByUsername(username)
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, UserMapper.toEntity(updateUserDto))
  }

  delete(id: string): Promise<void> {
    return this.userRepository.delete(id)
  }
}
