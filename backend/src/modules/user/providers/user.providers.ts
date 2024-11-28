import { DatabaseProvider } from 'src/infra/providers/base.provider'
import { User } from 'src/modules/user/entities/user.entity'

export const USER_REPOSITORY = 'USER_REPOSITORY'

const userRepositoryProvider = DatabaseProvider(User, USER_REPOSITORY)

export const userProviders = [userRepositoryProvider]
