import BaseParser, { Book, Novel } from '../baseParser'
import parseUrl from './parseUrl'
import parseChapters from './parseChapters'

export default class ChireadsParser implements BaseParser {
    public websiteName: string = 'Chireads'

    async parseUrl(
        url: string,
        progressTick: (tick: number) => void
    ): Promise<Novel> {
        return parseUrl(url, progressTick)
    }

    async parseChapters(
        novel: Novel,
        booksChoosed: Book[],
        progressTick: () => void
    ): Promise<Book[]> {
        return parseChapters(novel, booksChoosed, progressTick)
    }
}
