import { Book, Novel } from '../baseParser'
import Axios from 'axios'

export default async (
    url: string,
    progressTick: (tick: number) => void
): Promise<Novel> => {
    var splits = url.split('/')
    var novelSlug = splits[splits.length - 1]

    var novelTitleRes = await Axios.get(
        `https://wuxiaworld.eu/api/recommendations/${novelSlug}`
    )

    var chaptersRes = await Axios.get(
        `https://wuxiaworld.eu/api/chapters/${novelSlug}/`
    )

    var book: Book = {
        title: 'All Chapters',
    }

    book.chapters = chaptersRes.data.map((rawChapter: any) => {
        return {
            title: rawChapter.title,
            url:
                'https://www.wuxiaworld.eu/chapter/' +
                rawChapter.novSlugChapSlug,
        }
    })

    var novelData: Novel = {
        title: novelTitleRes.data.novel,
        cover: `https://wuxiaworld.fra1.cdn.digitaloceanspaces.com/full/${novelSlug}.webp?tr=w-150`,
        books: [book],
    }

    return novelData;
}
