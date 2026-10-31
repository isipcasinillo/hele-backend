import type { QueryOptions, QueryValues } from 'mysql2'
import { database } from './database.ts'

export class DataSource {
  protected db = {
    query: async <T>(
      options: QueryOptions,
      values?: QueryValues,
    ): Promise<[T, import('mysql2').FieldPacket[]]> => {
      return database.query(options, values) as Promise<[T, import('mysql2').FieldPacket[]]>
    },
  }
}
