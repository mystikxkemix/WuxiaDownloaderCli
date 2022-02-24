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
    var chaptersParseBar = new ProgressBar('Parsing chapters :percent [:bar]', {
        complete: '#',
        incomplete: '-',
        total: 100,
    })

    chaptersParseBar.tick(0)
    let totalChapters = 0
    for (var bookChoosed of booksChoosed) {
        totalChapters += bookChoosed.chapters?.length || 0
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
    const { urlParseBar, urlBarTick } = getUrlParseBar()
    var novel = await parser.parseUrl(novelUrl, urlBarTick)
    urlParseBar.terminate()

    var { booksChoosed } = await bookPrompt(novel)

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
