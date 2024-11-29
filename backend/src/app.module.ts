import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ItemModule } from './modules/item/item.module'
import { GameModule } from './modules/game/game.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      migrations: [`${__dirname}/migrations/{.ts,*.js}`],
      migrationsRun: true,
      synchronize: false,
      useUTC: true,
    }),
    ItemModule,
    GameModule,
  ],
})
export class AppModule {}
