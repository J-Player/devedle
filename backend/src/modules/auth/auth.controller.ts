import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthRequest } from 'src/modules/auth/types/auth-request'
import { Public } from 'src/common/decorators/public.decorator'
import { UserMapper } from 'src/modules/user/mappers/user.mapper'
import { AuthService } from './auth.service'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('login')
  async login(@Body() authRequest: AuthRequest) {
    return this.authenticationService.login(UserMapper.toEntity(authRequest))
  }

  @Post('register')
  async register(@Body() authRequest: AuthRequest) {
    return this.authenticationService.register(UserMapper.toEntity(authRequest))
  }

  @Get('logout')
  async logout() {
    return { message: 'Logout successful' }
  }
}
