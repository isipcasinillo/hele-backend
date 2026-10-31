import { BottleDatasource } from './modules/bottles/datasource/BottleDatasource.ts'
import { UserDataSource } from './modules/user/datasource/UserDatasource.ts'

export const createContext = async () => ({
  dataSources: {
    bottle: new BottleDatasource(),
    user: new UserDataSource(),
  },
})

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>
