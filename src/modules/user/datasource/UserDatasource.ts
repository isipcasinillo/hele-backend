import type { ResultSetHeader } from 'mysql2'
import { DataSource } from '../../../db/datasource.ts'
import type { CreateUserInput, User } from '../../../generated/graphql.ts'
import { hashPassword } from '../../../utils/hash.ts'

export class UserDataSource extends DataSource {
  selectfield = `
    SELECT
        id,
        email,
        firstName
        lastName
  `

  async createUser(input: CreateUserInput): Promise<User> {
    const passwordHash = await hashPassword(input.password)

    const sql = `
      INSERT INTO users (
        firstName,
        lastName,
        preferredName,
        email,
        phoneNumber,
        passwordHash
      )
      VALUES (
        :firstName,
        :lastName,
        :preferredName,
        :email,
        :phoneNumber,
        :passwordHash
      )
    `

    const [result] = await this.db.query<ResultSetHeader>(
      { sql },
      {
        firstName: input.firstName,
        lastName: input.lastName,
        preferredName: input.preferredName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        passwordHash,
      },
    )

    const [rows] = await this.db.query<User[]>(
      {
        sql: `
          ${this.selectfield}
          FROM hele_backend_db.users
          WHERE id = :id
        `,
      },
      { id: result.insertId },
    )

    if (!rows[0]) {
      throw new Error('Failed to retrieve created user')
    }

    return rows[0]
  }

  async getUserById(id: string): Promise<User | null> {
    const sql = `
    ${this.selectfield}
          FROM hele_backend_db.users
    WHERE id = :id
    LIMIT 1
  `

    const [rows] = await this.db.query<User[]>({ sql }, { id })

    return rows[0] ?? null
  }
}
