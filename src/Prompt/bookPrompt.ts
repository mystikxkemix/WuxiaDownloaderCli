import prompts from 'prompts'
import { Book, Novel } from '../Parser/baseParser'

type BookPromptReponse = {
    booksChoosed: Book[]
}

const askForBooks = async (novel: Novel): Promise<Book[]> => {
    const choices: any = []

    if (!novel.books) throw new Error('No books found')
    if (novel.books.length === 0) throw new Error('No books found')
    if (novel.books.length === 1) return Promise.resolve(novel.books)

    for (var book of novel.books) {
        choices.push({ title: book.title, value: book })
    }

    var response = await prompts({
        type: 'multiselect',
        name: 'books',
        message: 'Choose books',
        choices,
    })

    return Promise.resolve(response.books)
}

export default async (novel: Novel): Promise<BookPromptReponse> => {
    var booksChoosed = await askForBooks(novel)
    return { booksChoosed }
}
