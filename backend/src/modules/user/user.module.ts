import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './repositories/user.repository'
import { userProviders } from './providers/user.providers'
import { UserMapper } from './mappers/user.mapper'

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper, ...userProviders],
  exports: [UserService, UserRepository],
})
export class UserModule {}
