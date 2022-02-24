import puppeteer from 'puppeteer'

export type ParseUrlResponse = {}

export default async (url: string, progressTick: (tick: number) => void) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    progressTick(10)
    await page.click('button.fc-cta-consent', { delay: 0.5 })
    await page.click('#full-width-tab-1', { delay: 0.5 })
    progressTick(10)
    // Open sections
    await page.evaluate(() => {
        var list = document.getElementsByClassName('MuiPaper-root')
        const returnList: any[] = []
        for (var e of list) {
            if (e.tagName !== 'DIV') continue
            if (e.getElementsByClassName('MuiCollapse-hidden').length === 0)
                continue

            const _e = e as HTMLElement
            var newList = e.getElementsByClassName('MuiButtonBase-root')
            if (newList.length > 0) {
                const elem = newList[0] as HTMLElement
                elem.click()
            }
        }

        return returnList
    })
    progressTick(10)

    await page.waitForTimeout(2000)
    progressTick(10)

    var novelTitle = await page.evaluate(() => {
        return (document.querySelector('h1.MuiTypography-root') as HTMLElement)
            .innerText
    })
    progressTick(10)

    var novelCover = await page.evaluate(() => {
        var imgs = document.getElementsByTagName('img')
        for (var img of imgs) {
            const src = img.getAttribute('src')
            if (!src) continue
            if (src.indexOf('https://cdn.wuxiaworld.com/images/covers') > 0) {
                const matches =
                    src.match(
                        /(https:\/\/cdn\.wuxiaworld\.com\/images\/covers\/.*\.(?:jpg|png))/gm
                    ) || []
                if (matches.length > 0) {
                    return matches[0]
                }
            }
        }
    })
    progressTick(20)

    var bookElements = await page.evaluate(() => {
        var list = document.getElementsByClassName('MuiPaper-root')
        const returnList: any[] = []
        for (var e of list) {
            if (e.tagName !== 'DIV') continue
            const bookData: any = {}
            const titleElements = e.getElementsByClassName(
                'font-semibold text-[18px]'
            )
            if (titleElements.length === 0) continue

            bookData.title = (titleElements[0] as HTMLElement).innerText

            var chapterElements = e.getElementsByTagName('a')
            console.log(chapterElements)
            bookData.chapters = []
            for (var chapterElement of chapterElements) {
                let url = chapterElement.getAttribute('href')
                if (url?.startsWith('https') === false)
                    url = 'https://www.wuxiaworld.com' + url
                const title = (chapterElement as HTMLElement).innerText
                bookData.chapters.push({ url, title, content: 'toto' })
            }

            bookData.chapters = bookData.chapters.reverse()

            returnList.push(bookData)
        }

        return returnList
    })
    progressTick(20)

    await browser.close()
    progressTick(10)
    return { title: novelTitle, books: bookElements, cover: novelCover }
}
