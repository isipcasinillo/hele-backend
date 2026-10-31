import { GraphQLContext } from '../../../context.ts'
import { CreateUserInput } from '../../../generated/graphql.ts'
import { hashPassword } from '../../../utils/hash.ts'

export const resolvers = {
  Query: {
    user: async (_parent: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      return dataSources.user.getUserById(id)
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { input }: { input: CreateUserInput },
      { dataSources }: GraphQLContext,
    ) => {
      return dataSources.user.createUser(input)
    },
  },
}
