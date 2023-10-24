import Epub from '../Epub'
import bookPrompt from './bookPrompt'
import websitePrompt from './websitePrompt'

import ProgressBar from 'progress'
import { Book } from '../Parser/baseParser'

const getUrlParseBar = () => {
    var urlParseBar = new ProgressBar(
        'Parsing for novel info :percent [:bar]',
        {
            complete: '#',
            incomplete: '-',
            total: 100,
        }
    )
    urlParseBar.tick(0)

    return {
        urlParseBar,
        urlBarTick: (tick: number) => {
            urlParseBar.tick(tick)
        },
    }
}

const getChaptersParseBar = (booksChoosed: Book[]) => {
    const chaptersParseBar = new ProgressBar(
        'Parsing chapters :percent [:bar]',
        {
            complete: '#',
            incomplete: '-',
            total: 100,
        }
    )

    chaptersParseBar.tick(0)
    let totalChapters = 0
    for (const bookChoosed of booksChoosed) {
        totalChapters += bookChoosed.chapters?.length ?? 0
    }

    return {
        chaptersParseBar,
        chaptersBarTick: () => {
            chaptersParseBar.tick(100 / totalChapters)
        },
    }
}

export default async () => {
    const { parser, novelUrl } = await websitePrompt()
    if (!novelUrl?.startsWith('http')) return

    const { urlParseBar, urlBarTick } = getUrlParseBar()
    const novel = await parser.parseUrl(novelUrl, urlBarTick)
    urlParseBar.terminate()

    let { booksChoosed } = await bookPrompt(novel)
    if (!booksChoosed || booksChoosed.length === 0) return

    const { chaptersParseBar, chaptersBarTick } =
        getChaptersParseBar(booksChoosed)

    booksChoosed = await parser.parseChapters(
        novel,
        booksChoosed,
        chaptersBarTick
    )

    chaptersParseBar.terminate()

    await Epub.exportBooks(parser, novel, booksChoosed)
}
