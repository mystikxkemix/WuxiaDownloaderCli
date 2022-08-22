import Axios from 'axios'
import { JSDOM } from 'jsdom'

import { Book, Chapter, Novel } from '../baseParser'

async function parseChapter(chapter: Chapter, progressTick: () => void) {
    var res = await Axios.get(chapter.url!)
    const dom = new JSDOM(res.data)
    const textDivs =
        dom.window.document.getElementsByClassName('mantine-Text-root')

    // let content = '<div>'
    let content = ''
    for (var textDiv of textDivs) {
        if (textDiv.id !== 'chapterText') continue
        content += `<p>${textDiv.innerHTML}</p>`
    }

    // content += '</div>'

    chapter.content = content

    progressTick()
}

export default async (
    novel: Novel,
    booksChoosed: Book[],
    progressTick: () => void
): Promise<Book[]> => {
    var promises: Promise<void>[] = []
    var i = 0
    for (var bookChoosed of booksChoosed) {
        if (!bookChoosed.chapters) continue
        for (var chapter of bookChoosed.chapters) {
            if (!chapter.url) continue
            promises.push(parseChapter(chapter, progressTick))
        }
    }
    await Promise.all(promises)
    return booksChoosed
}
