import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'

export class UserMapper {
  static toEntity(dto: CreateUserDto | UpdateUserDto): User {
    const user = new User()
    user.username = dto.username
    user.password = dto.password
    return user
  }

  static toView(user: User) {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    }
  }
}
