import type { GraphQLContext } from '../../../context.ts'

export const resolvers = {
  Query: {
    bottles: (_parent: unknown, _args: unknown, { dataSources }: GraphQLContext) => {
      return dataSources.bottle.getBottles()
    },
  },
}
