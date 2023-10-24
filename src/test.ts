import parseChapters from './Parser/ChireadsParser/parseChapters'
import parseUrl from './Parser/ChireadsParser/parseUrl'
;(async () => {
    const novel = await parseUrl(
        'https://chireads.com/category/translatedtales/eminence-des-ombres/',
        () => {}
    )

    // const toto = await parseChapters(novel, novel.books, () => {})

    // console.log(toto?.[0].chapters?.[0])
})()
