import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ItemModule } from './modules/item/item.module'
import { GameModule } from './modules/game/game.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: Number(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        migrations: [`${__dirname}/migrations/{.ts,*.js}`],
        migrationsRun: true,
        synchronize: false,
        ssl: true,
        useUTC: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist', 'browser'),
      exclude: ['api/*'],
    }),
    ItemModule,
    GameModule,
  ],
})
export class AppModule {}
