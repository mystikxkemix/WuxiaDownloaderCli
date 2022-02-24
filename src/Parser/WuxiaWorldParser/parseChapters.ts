import PuppeteerManager from '../../Downloader/PuppeteerManager'
import { Novel, Book, Chapter } from '../baseParser'

async function parseChapter(
    chapter: Chapter,
    progressTick: () => void
): Promise<void> {
    var client = await PuppeteerManager.instance.getNewClient()
    const page = await client.newPage()
    await page.goto(chapter.url!)

    await page.click('button.fc-cta-consent', { delay: 0.5 })

    var result = await page.evaluate(() => {
        var contents = document.getElementsByClassName('chapter-content')
        return (contents[0] as HTMLElement).innerHTML
    })

    chapter.content = result
    await client.close()
    progressTick()
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
        }
    }
    await Promise.all(promises)
    return booksChoosed
}
