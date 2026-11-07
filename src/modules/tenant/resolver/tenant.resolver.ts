import { GraphQLContext } from '../../../context.ts'
import { CreateTenantPayload } from '../../../generated/graphql.ts'

export const resolvers = {
  Query: {},
  Mutation: {
    addTenant: (
      _parent: unknown,
      { payload }: { payload: CreateTenantPayload },
      { dataSources }: GraphQLContext,
    ) => {
      return dataSources.tenant.upsertTenant(payload)
    },
  },
}
