import type { GraphQLContext } from '../../../context.ts'

export const resolvers = {
  Query: {
    books: (
      _parent: unknown,
      _args: unknown,
      { dataSources }: GraphQLContext,
    ) => {
      
      return dataSources.book.getBooks()
    },

    book: (
      _parent: unknown,
      { id }: { id: string },
      { dataSources }: GraphQLContext,
    ) => {
      return dataSources.book.getBook(id)
    },
  },
}