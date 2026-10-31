import { DataSource } from '../../../db/datasource.ts'
import { Bottle } from '../../../generated/graphql.ts'

const selectfield = `
    SELECT
      id,
      amount,
      userId,
      feedingType,
      createdDate,
      childId,
      comment,
      modifiedDate,
      modifiedBy,
      feedingTypeSub
  `

export class BottleDatasource extends DataSource {
  async getBottles(): Promise<Bottle[]> {
    const sql = `
      ${selectfield}
      FROM hele_backend_db.bottles
    `
    const [rows] = await this.db.query<Bottle[]>({ sql }, {})

    return rows
  }
}
