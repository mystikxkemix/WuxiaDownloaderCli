import Epub from '../Epub'
import bookPrompt from './bookPrompt'
import websitePrompt from './websitePrompt'

export default async () => {
    const { parser, novelUrl } = await websitePrompt()
    var novel = await parser.parseUrl(novelUrl)
    var { booksChoosed } = await bookPrompt(novel)
    await Epub.exportBooks(parser, novel, booksChoosed)
}
