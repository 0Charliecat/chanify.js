const axios = require('axios');
const pack  = require('./package.json')

class Chanify {

    #URL
    #token

    /**
     * `new Chanify( options )`
     * @param {String|URL|{token: string,host: string,apiVersion?:string,https?:boolean}} options
     * @returns {any}
     */
    constructor(options) {

        let OptionsExample1 = {
            token: String,
            host: String,
            https: Boolean, // true by default
            apiVersion: String, // "v1" by default
        }

        let OptionsExample2 = String || URL

        let thisExample = {
            '#URL': URL,
            '#token': String,
            host:  String,
            apiVersion: String,
            https: Boolean,
        }

        if (typeof options === 'string' || options.constructor.name === 'URL') {
            this.#URL = new URL(options)
            this.host = this.#URL.host
            this.https = this.#URL.protocol === 'https'

            let path = this.#URL.pathname.split('/')

            this.#token = String(path[2])
            this.apiVersion = String(path[0])

        } else if (typeof options === 'object' && !Array.isArray(options)) {

            this.https = (!Boolean(options.https)) ? true : Boolean(options.https)
            this.apiVersion = (!Boolean(options.apiVersion)) ? "v1" : String(options.apiVersion)
            this.useragent = (!Boolean(options.userAgent)) ? `${pack.name}/${pack.version} (on Node ${process.version}) +${pack.homepage}` : String(options.userAgent)

            this.#token = String(options.token)
            this.host = String(options.host)

            this.#URL = new URL(`${(this.https) ? 'https' : 'http'}://${this.host}/${this.apiVersion}/sender/${this.#token}`)
        } else {
            throw new Error('Invalid API options')
        }
    }

    /**
     * `<Chanify>.sendMessage( Message )`
     * @param {Message} message
     * @returns {any}
     */
    async sendMessage(message, useragent) {
        await axios.post(String(this.#URL)+'?content-type=json', {
            headers: { 
                'User-Agent': (useragent) ? useragent : this.useragent
            },
            data: message.toJSON()
        })
    }

    /**
     * `<Chanify>.compose()`
     * @returns {Message}
     * @example
     * chanify.compose().addTitle("Hello from JS").send()
     */
    compose() {
        return new Message({}, this)
    }

}

module.exports = Chanify