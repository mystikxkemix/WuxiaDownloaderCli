import { Puppeteer } from 'puppeteer'

export type Novel = {
    title: string
    books: Book[]
}

export type Book = {
    title: string
    chapters?: Chapter[]
}

export type Chapter = {
    title: string
    url?: string
    content?: string
}

const fakeNovel: Novel = {
    title: 'toto',
    books: [
        {
            title: 'book1',
            chapters: [{ title: 'Chapter1', content: 'Toitot' }],
        },
    ],
}

export default interface BaseParser {
    websiteName: string
    parseUrl: (url: string) => Promise<Novel>
    prepareWebsite: () => Promise<any>
    parseCover: () => Promise<any>
}
