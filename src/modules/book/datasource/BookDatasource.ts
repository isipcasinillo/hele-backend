type Book = {
  id: string
  title: string
  author: string
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
  },
]

export class BookDataSource {
  async getBooks(): Promise<Book[]> {
    return books
  }

  async getBook(id: string): Promise<Book | undefined> {
    return books.find(book => book.id === id)
  }
}