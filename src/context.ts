
import { BookDataSource } from './modules/book/datasource/BookDatasource.ts'
export const createContext = async () => ({
  dataSources: {
    book: new BookDataSource(),
  },
})

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>