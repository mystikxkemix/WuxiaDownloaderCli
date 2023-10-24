import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Book, Chapter, Novel } from '../baseParser'

export default async function parseChapters(
    novel: Novel,
    booksChoosed: Book[],
    progressTick: () => void
): Promise<Book[]> {
    const promises: Promise<void>[] = []
    for (const bookChoosed of booksChoosed) {
        if (!bookChoosed.chapters) continue
        for (const chapter of bookChoosed.chapters) {
            if (!chapter.url) continue
            promises.push(
                parseChapter(chapter, progressTick).catch((e) => {
                    console.log(chapter.url, e)
                })
            )
        }
    }
    await Promise.all(promises)

    const regex = /Chapitre (\d+)/
    booksChoosed.forEach((book) => {
        if (!book.chapters) return

        book.chapters = book.chapters.sort((a, b) => {
            const aMatch = regex.exec(a.title)
            const bMatch = regex.exec(b.title)
            if (!aMatch || !bMatch) return 0
            return parseInt(aMatch[1]) - parseInt(bMatch[1])
        })
    })

    return booksChoosed
}

async function parseChapter(chapter: Chapter, progressTick: () => void) {
    const res = await axios.get(chapter.url!)
    const dom = new JSDOM(res.data)
    const chapterDiv = dom.window.document.getElementById('content')
    if (chapterDiv === null) throw new Error('Chapter div not found')
    const textDivs = chapterDiv.getElementsByTagName('p')

    // let content = '<div>'
    let content = ''
    for (const textDiv of textDivs) {
        content += `<p>${textDiv.innerHTML}</p>`
    }

    // content += '</div>'

    chapter.content = content

    progressTick()
}
