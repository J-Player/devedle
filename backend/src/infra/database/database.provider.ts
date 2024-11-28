import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

export const DATA_SOURCE = 'DATA_SOURCE'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        synchronize: true,
        useUTC: true,
      })

      return dataSource.initialize()
    },
  },
]
