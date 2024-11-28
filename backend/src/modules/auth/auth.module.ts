import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { AuthService } from 'src/modules/auth/auth.service'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { ConfigService } from '@nestjs/config'
import { UserMapper } from '../user/mappers/user.mapper'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>('JWT_EXPIRATION'),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserMapper,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
