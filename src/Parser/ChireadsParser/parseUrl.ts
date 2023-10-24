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

    const images = dom.window.document.getElementsByClassName('inform-product')
    let urlIcon: string | undefined = undefined
    if (images.length >= 1) {
        urlIcon = images[0].getElementsByTagName('img')[0].src
    }

    const links: HTMLAnchorElement[] = []
    const chapterDiv = dom.window.document.getElementsByClassName('chapitre')

    const rawLinks = chapterDiv[0].getElementsByTagName('a')

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
        title: titles[0]
            .textContent!.replace(/[^\w\s|]/g, '')
            .replace(/É/, 'E'),
        cover: urlIcon,
        books: [
            {
                title: 'story',
                chapters: chapters,
            },
        ],
    }
}
