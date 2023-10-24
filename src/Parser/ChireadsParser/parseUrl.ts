import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Novel } from '../baseParser'

export default async function parseUrl(
    url: string,
    progressTick: (tick: number) => void
): Promise<Novel> {
    const res = await axios.get(url)
    const dom = new JSDOM(res.data)

    const titles = dom.window.document.getElementsByClassName(
        'inform-title font-color-black3'
    )

    const links: HTMLAnchorElement[] = []
    const rawLinks = dom.window.document.getElementsByTagName('a')

    for (const rawLink of rawLinks) {
        if (rawLink.textContent?.includes('Chapitre')) {
            links.push(rawLink)
        }
    }

    const chapters = links.map((link) => ({
        title: link.textContent!,
        url: link.href,
    }))

    progressTick(100)

    return {
        title: titles[0].textContent!,
        books: [
            {
                title: 'book1',
                chapters: chapters,
            },
        ],
    }
}
