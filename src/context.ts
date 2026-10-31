import { BottleDatasource } from './modules/bottles/datasource/BottleDatasource.ts'
export const createContext = async () => ({
  dataSources: {
    bottle: new BottleDatasource(),
  },
})

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>
