import { DataSource, ObjectLiteral, EntityTarget } from 'typeorm'
import { DATA_SOURCE } from '../database/database.provider'

export const DatabaseProvider = <T extends ObjectLiteral>(
  entity: EntityTarget<T>,
  name: string,
) => {
  return {
    provide: name,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: [DATA_SOURCE],
  }
}
