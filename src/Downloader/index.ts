import puppeteer from 'puppeteer'

export default async (url: string) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)
    await page.click('button.fc-cta-consent', { delay: 0.5 })
    await page.click('#full-width-tab-1', { delay: 0.5 })
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

    await page.waitForTimeout(2000)

    var novelTitle = await page.evaluate(() => {
        return (document.querySelector('h1.MuiTypography-root') as HTMLElement)
            .innerText
    })

    var chapterElements = await page.evaluate(() => {
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
                bookData.chapters.push({ url, title })
            }

            returnList.push(bookData)
        }

        return returnList
    })
    console.log(chapterElements[0].chapters)
    // var test = await chapterElements[2].querySelector('span.text-[18px]')

    // await page.screenshot({ path: 'example.png' })

    // await browser.close()
}
