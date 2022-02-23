import prompts from 'prompts'
import { Book, Novel } from '../Parser/baseParser'

type BookPromptReponse = {
    bookChoosed: Book[]
}

const askForBooks = async (novel: Novel): Promise<Book[]> => {
    const choices: any = []

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
    var bookChoosed = await askForBooks(novel)
    return { bookChoosed }
}
