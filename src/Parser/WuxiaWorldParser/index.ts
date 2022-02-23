import BaseParser, { Novel } from '../baseParser'
import parseUrl from './parseUrl'

const fakeNovel: Novel = {
    title: 'toto',
    books: [
        {
            title: 'book1',
            chapters: [{ title: 'Chapter1', content: 'Toitot' }],
        },
        {
            title: 'book2',
            chapters: [{ title: 'Chapter2', content: 'Toitot' }],
        },
        {
            title: 'book3',
            chapters: [{ title: 'Chapter3', content: 'Toitot' }],
        },
        {
            title: 'book4',
            chapters: [{ title: 'Chapter4', content: 'Toitot' }],
        },
        {
            title: 'book5',
            chapters: [{ title: 'Chapter5', content: 'Toitot' }],
        },
    ],
}

export default class WuxiaWorldParser implements BaseParser {
    public websiteName: string = 'WuxiaWorld'
    async parseUrl(url: string): Promise<Novel> {
        var novelData = await parseUrl(url)
        return Promise.resolve(novelData as Novel)
    }

    prepareWebsite(): Promise<any> {
        return Promise.resolve()
    }
    parseCover(): Promise<any> {
        return Promise.resolve()
    }
}
