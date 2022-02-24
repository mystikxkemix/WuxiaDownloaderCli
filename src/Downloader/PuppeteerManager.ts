import puppeteer, { Browser, Page } from 'puppeteer'

export type PuppeteerManagerOptions = {
    instanceNumber: number
}

export class PuppeteerClient {
    private browser: Browser | undefined = undefined

    public async newPage(url: string): Promise<Page> {
        if (this.browser === undefined) throw 'No browser instance'
        return this.browser.newPage()
    }

    async init() {
        this.browser = await puppeteer.launch()
    }

    async close(): Promise<void> {
        if (this.browser === undefined) throw 'No browser instance'
        await this.browser.close()
        this.browser = undefined
        await PuppeteerManager.instance.closeClient(this)
    }
}

const defaultOptions: PuppeteerManagerOptions = {
    instanceNumber: 10,
}

class Waiting {
    public promise: Promise<void>
    private closing: boolean = false

    constructor() {
        const self = this
        this.promise = new Promise<void>((resolve) => {
            self.waitForTrigger(resolve)
        })
    }

    private waitForTrigger(resolve: any) {
        setTimeout(() => {
            if (this.closing) {
                resolve()
            } else {
                this.waitForTrigger(resolve)
            }
        }, 100)
    }

    public trigger() {
        this.closing = true
    }
}

class PuppeteerManager {
    public static instance: PuppeteerManager
    private _localOptions: PuppeteerManagerOptions
    private clients: PuppeteerClient[] = []

    private waitingPromises: Waiting[] = []

    public static init(options?: PuppeteerManagerOptions) {
        if (!options) options = defaultOptions
        this.instance = new PuppeteerManager(options)
    }

    private constructor(options: PuppeteerManagerOptions) {
        this._localOptions = options
    }

    public async getNewClient(): Promise<PuppeteerClient> {
        if (this.clients.length >= this._localOptions.instanceNumber) {
            var waiting = new Waiting()
            this.waitingPromises.push(waiting)
            await waiting.promise
            const index = this.waitingPromises.indexOf(waiting)
            this.waitingPromises.splice(index, 1)
        }

        const newInstance = new PuppeteerClient()
        this.clients.push(newInstance)
        await newInstance.init()
        return newInstance
    }

    public async closeClient(client: PuppeteerClient): Promise<void> {
        const index = this.clients.indexOf(client)
        this.clients.splice(index, 1)
        if (this.waitingPromises.length > 0) {
            this.waitingPromises[0].trigger()
        }
    }
}

export default PuppeteerManager
