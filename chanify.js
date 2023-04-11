const axios    = require('axios');
const pack     = require('./package.json')
const FormData = require('form-data')
const fs       = require('fs')
const { InterruptionLevel, Sound, AutoCopy, Message, Action, Priority } = require('./msgclasses')

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

        this.useragent = (!Boolean(options.userAgent)) ? `${pack.name}/${pack.version} (on Node ${process.version}) +${pack.homepage}` : String(options.userAgent)

        if (typeof options === 'string' || options.constructor.name === 'URL') {
            this.#URL = new URL(options)
            this.host = this.#URL.host
            this.https = this.#URL.protocol === 'https:'

            let path = this.#URL.pathname.split('/')

            this.#token = String(path[3])
            this.apiVersion = String(path[1])

        } else if (typeof options === 'object' && !Array.isArray(options)) {

            this.https = (!Boolean(options.https)) ? true : Boolean(options.https)
            this.apiVersion = (!Boolean(options.apiVersion)) ? "v1" : String(options.apiVersion)

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
     * @returns {axios}
     */
    async sendMessage(message, useragent) {
        //console.log(`<Chanify>.sendMessage( Message ): url`, String(this.#URL)+'?content-type=json')
        //console.log(`<Chanify>.sendMessage( Message ): body`, JSON.stringify(message))
        try {
            let ax = await axios.post(String(this.#URL)+'?content-type=json', message, {
                headers: { 
                    'User-Agent': (useragent) ? useragent : this.useragent
                },
            })
            return ax
        } catch (e) {
            throw e
            //console.log(`<Chanify>.sendMessage( Message ): err`, e)
        }
        
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

    /**
     * `<Chanify>.sendFile( file, name )`
     * @param {ReadableStream|String} file Provide a readable stream or path to the file
     * @param {String?} name if file if string then the file path is used
     * @returns {axios}
     */
    /*async sendFile(file, name) {
        let prefile = file
        const form = new FormData();
        if (typeof file === "string") {
            file = fs.createReadStream(file)
        } 
        form.append('file', file, (typeof prefile === "string") ? prefile.split('/').pop() : name);
        console.log(form)
        console.log(file)

        try {
            await axios.post(String(this.#URL), form, {
                headers: { 
                    ...form.getHeaders(),
                    'User-Agent': this.useragent
                },
            })
        } catch (e) {
            //console.log(`<Chanify>.sendFile( file, name ): err`, e)
        }
    }*/

}

module.exports = Chanify