import Epub from '../Epub'
import bookPrompt from './bookPrompt'
import websitePrompt from './websitePrompt'

import ProgressBar from 'progress'

export default async () => {
    const { parser, novelUrl } = await websitePrompt()
    var bar = new ProgressBar('Parsing for novel info :percent [:bar]', {
        complete: '#',
        incomplete: '-',
        total: 100,
    })
    bar.tick(0)
    var novel = await parser.parseUrl(novelUrl, (tick: number) => {
        bar.tick(tick)
    })
    var { booksChoosed } = await bookPrompt(novel)
    booksChoosed = await parser.parseChapters(novel, booksChoosed)
    await Epub.exportBooks(parser, novel, booksChoosed)
}
