import BaseParser, { Book, Novel } from '../Parser/baseParser'
import * as EpubJS from './epub'

const exportBook = async (
    parser: BaseParser,
    novel: Novel,
    bookChoosed: Book
): Promise<string> => {
    return EpubJS.default.exportEpub(
        bookChoosed.title,
        novel.title,
        parser.websiteName,
        novel.cover,
        `${novel.title} - ${bookChoosed.title}.epub`,
        bookChoosed.chapters?.map((chapter) => {
            return { title: chapter.title, data: chapter.content }
        })
    )
}

const Epub = {
    exportBooks: (
        parser: BaseParser,
        novel: Novel,
        booksChoosed: Book[]
    ): Promise<string[]> => {
        var promises: Promise<string>[] = []
        for (var bookChoosed of booksChoosed) {
            promises.push(exportBook(parser, novel, bookChoosed))
        }

        return Promise.all(promises)
    },
}

export default Epub
