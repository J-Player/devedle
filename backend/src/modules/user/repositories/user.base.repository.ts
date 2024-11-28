import { User } from '../entities/user.entity'

export abstract class UserBaseRepository {
  abstract findById(id: string): Promise<User>
  abstract findByUsername(username: string): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract save(user: User): Promise<User>
  abstract update(id: string, user: User): Promise<User>
  abstract delete(id: string): Promise<void>
}
