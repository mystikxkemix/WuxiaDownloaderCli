import BaseParser, { Novel } from './baseParser'

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
    parseUrl(url: string): Promise<Novel> {
        return Promise.resolve(fakeNovel)
    }

    prepareWebsite(): Promise<any> {
        return Promise.resolve()
    }
    parseCover(): Promise<any> {
        console.log('toto')
        return Promise.resolve()
    }
}
