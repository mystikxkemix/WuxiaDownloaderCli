import bookPrompt from './bookPrompt'
import websitePrompt from './websitePrompt'

export default async () => {
    const { parser, novelUrl } = await websitePrompt()
    var novel = await parser.parseUrl(novelUrl)
    var response = await bookPrompt(novel)
    console.log(response)
}
