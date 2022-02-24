import { Novel, Book } from '../baseParser'

export default async (novel: Novel, booksChoosed: Book[]): Promise<Book[]> => {
    return booksChoosed
}
