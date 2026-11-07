import { BottleDatasource } from './modules/bottles/datasource/BottleDatasource.ts'
import { TenantDatasource } from './modules/tenant/datasource/TenantDatasource.ts'
export const createContext = async () => ({
  dataSources: {
    bottle: new BottleDatasource(),
    tenant: new TenantDatasource(),
  },
})

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>
