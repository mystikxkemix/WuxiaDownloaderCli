import parseUrl from './Parser/WuxiaWorldEuParser/parseUrl'
import parseChapters from './Parser/WuxiaWorldEuParser/parseChapters'

parseUrl(
    'https://www.wuxiaworld.eu/novel/omniscient-readers-viewpoint',
    () => {}
)
    .then((res) => {
        console.log(res)

        return parseChapters(res, res.books, () => {})
    })
    .then((res) => {
        console.log(res)
    })
