import prompts from 'prompts'
import Parser from '../Parser'
import BaseParser from '../Parser/baseParser'

type WebsitePromptReponse = {
    parser: BaseParser
    novelUrl: string
}

const askForWebsite = async (): Promise<BaseParser> => {
    if (Parser.parsers.length === 1) {
        const parser = new Parser.parsers[0]()
        console.log(`Only ${parser.websiteName} available.`)
        return parser
    }

    const choices: any[] = []

    for (var parser of Parser.parsers) {
        const parserInstance = new parser()
        choices.push({
            title: parserInstance.websiteName,
            value: parserInstance,
        })
    }

    var response = await prompts({
        type: 'select',
        name: 'parser',
        message: 'Choose a website',
        choices,
    })
    return response.parser
}

const askForUrl = async (websiteName: string): Promise<string> => {
    return 'https://www.wuxiaworld.com/novel/against-the-gods'
    var response = await prompts({
        type: 'text',
        name: 'url',
        message: `Enter the url of your ${websiteName} novel`,
    })

    return response.url
}

export default async (): Promise<WebsitePromptReponse> => {
    var parser = await askForWebsite()
    var novelUrl = await askForUrl(parser.websiteName)

    return { parser, novelUrl }
}
