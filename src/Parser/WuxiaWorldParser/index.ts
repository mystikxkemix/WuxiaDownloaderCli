import BaseParser, { Book, Novel } from '../baseParser'
import parseChapters from './parseChapters'
import parseUrl from './parseUrl'

export default class WuxiaWorldParser implements BaseParser {
    public websiteName: string = 'WuxiaWorld'

    async parseUrl(
        url: string,
        progressTick: (tick: number) => void
    ): Promise<Novel> {
        var novelData = await parseUrl(url, progressTick)
        return Promise.resolve(novelData as Novel)
    }

    async parseChapters(novel: Novel, booksChoosed: Book[]): Promise<Book[]> {
        return parseChapters(novel, booksChoosed)
    }
}
