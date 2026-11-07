import { ResultSetHeader } from 'mysql2/promise'
import { DataSource } from '../../../db/datasource.ts'
import { CreateTenantPayload, TenantStatus } from '../../../generated/graphql.ts'

export class TenantDatasource extends DataSource {
  async upsertTenant(payload: CreateTenantPayload): Promise<boolean> {
    const { name, ownerId } = payload

    const sql = `
      INSERT INTO hele_backend_db.tenant (
        name,
        ownerId,
        status,
        createdAt,
        modifiedAt
      )
      VALUES (
        :name,
        :ownerId,
        :status,
        NOW(),
        NOW()
      )
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        status = VALUES(status),
        modifiedAt = NOW()
    `

    const [result] = await this.db.query<ResultSetHeader>(
      { sql, namedPlaceholders: true },
      {
        name,
        ownerId,
        status: TenantStatus.Suspended,
      },
    )

    return result.affectedRows > 0
  }
}
