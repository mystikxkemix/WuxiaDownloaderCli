import Axios from 'axios'
import { Book, Chapter, Novel } from '../baseParser'

async function parseChapter(chapter: Chapter, progressTick: () => void) {
    var res = await Axios.get(chapter.url!)

    console.log('Toto', res)
}

export default async (
    novel: Novel,
    booksChoosed: Book[],
    progressTick: () => void
): Promise<Book[]> => {
    var promises: Promise<void>[] = []
    for (var bookChoosed of booksChoosed) {
        if (!bookChoosed.chapters) continue
        for (var chapter of bookChoosed.chapters) {
            if (!chapter.url) continue
            promises.push(parseChapter(chapter, progressTick))
            break
        }
    }
    await Promise.all(promises)
    return booksChoosed
}
