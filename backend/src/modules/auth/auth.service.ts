import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserMapper } from 'src/modules/user/mappers/user.mapper'
import { User } from 'src/modules/user/entities/user.entity'
import { UserService } from 'src/modules/user/user.service'
import { Token } from './types/token'
import { TokenPayload } from './types/token-payload'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const userExists = await this.userService.findByUsername(user.username)
    if (!userExists) throw new BadRequestException('User not found')
    if (userExists?.password !== user.password) {
      throw new BadRequestException('Invalid password')
    }
    return await this.generateToken(userExists)
  }

  async register(user: User) {
    const userExists = await this.userService.findByUsername(user.username)
    if (userExists) {
      throw new UnauthorizedException('User already exists')
    }
    return this.userService.save(UserMapper.toEntity(user))
  }

  async generateToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateToken(token: string) {
    const payload = this.jwtService.verify(token)
    return payload
  }
}
