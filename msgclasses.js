const EXAMPLEPOSTBODY = {
    "token": "<token>",
    "title": "<message title>",
    "text": "<text message content>",
    "copy": "<copy text for text message>",
    "autocopy": 1,
    "sound": 1,
    "priority": 10,
    "interruptionlevel": 0,
    "actions": [
        "ActionName1|http://<action host>/<action1>",
        "ActionName2|http://<action host>/<action2>",
    ],
    "timeline": {
        "code": "<timeline code>",
        "timestamp": 1620000000000,
        "items": {
            "key1": "value1",
            "key2": "value2",
        }
    }
}

const InterruptionLevel = {
    Active: "active",

    Passive: "passive",
    TimeSensitive: "time-sensitive"
}
Object.freeze(InterruptionLevel)

const Sound = {
    None: 0,
    Enable: 1,
    Default: "default",

    Alarm: "alarm",
    Anticipate: "anticipate",
    Bell: "bell",
    Bloom: "bloom",
    Calypso: "calypso",
    Chime: "chime",
    Choo: "choo",
    Decent: "decent",
    Electronic: "electronic",
    Fanfare: "fanfare",
    Glass: "glass",
    GoToSleep: "go_to_sleep",
    HealthNotification: "health_notification",
    Horn: "horn",
    Ladder: "ladder",
    Minuet: "minuet",
    MultiwayInvitation: "multiway_invitation",
    NewMail: "new_mail",
    NewsFlash: "news_flash",
    Noir: "noir",
    PaymentSuccess: "payment_success",
    SentMail: "sent_mail",
    SentSMS: "sent_sms",
    Shake: "shake",
    SherwoodForest: "sherwood_forest",
    Spell: "spell",
    Suspense: "suspense",
    Telegraph: "telegraph",
    Tiptoes: "tiptoes",
    Typewriters: "typewriters",
    Update: "update",
}
Object.freeze(Sound)

const AutoCopy = {
    Enable: 1,
    Disable: 0,
}
Object.freeze(AutoCopy)


class Message {
    #parent

    /**
     * `new Message( content ) || <Chanify>.sendMessage( Message ) || <Chanify>.compose()`
     * @param {{title:string?,text:string?,copy:number?,autocopy:number?,sound:string|number|null,priority:number|10|null,interruptionlevel:string|0|null,action:Action|String|null}} content
     * @param {Chanify?} parent
     * @returns {Message}
     */
    constructor(content, parent) {
        this.title             = (!content.title)             ? null : String(content.title)
        this.text              = (!content.text)              ? null : String(content.text)
        this.copy              = (!content.copy)              ? null : String(content.copy)
        this.autocopy          = (!content.autocopy)          ? null : Number(content.autocopy)
        this.sound             = (!content.sound)             ? null : content.sound
        this.priority          = (!content.priority)          ? 10   : content.priority
        this.interruptionlevel = (!content.interruptionlevel) ? null : content.interruptionlevel
        this.actions           = (!content.actions)           ? [] : (Array.isArray(content.actions)) ? content.actions.map(Action) : [ new Action(content.actions) ]
        
        this.#parent = parent
    }

    /**
     * `<Message>.setTitle( title )`
     * @param {String} title
     * @returns {Message}
     */
    setTitle(title) {
        this.title = String(title)
        return this
    }

    /**
     * `<Message>.setText( text )`
     * @param {String} text
     * @returns {Message}
     */
    setText(text) {
        this.text = String(text)
        return this
    }

    /**
     * `<Message>.setCopy( copy )`
     * @param {String} copy
     * @returns {Message}
     */
    setCopy(copy) {
        this.copy = String(copy)
        return this
    }

    /**
     * `<Message>.setAutoCopy( autocopy )`
     * @param {Boolean|0|1} autocopy
     * @returns {Message}
     */
    setAutoCopy(autocopy) {
        this.autocopy = (autocopy === false) ? 0 : (autocopy === 1) ? 1 : (Object.values(AutoCopy).includes(autocopy)) ? autocopy : null;
        return this
    }

    /**
     * `<Message>.setSound( sound )`
     * @param {String} sound
     * @returns {Message}
     */
    setSound(sound) {
        this.sound = (Object.values(Sound).includes(sound)) ? sound : null;
        return this
    }

    /**
     * `<Message>.setPriority( priority )`
     * @param {0|1|2|3|4|5|6|7|8|9|10} priority `10` normal, `5` lower level (from GH README.md)
     * @returns {Message}
     */
    setPriority(priority) {
        this.priority = new Priority(priority).toJSON();
        return this
    }

    /**
     * `<Message>.setInterruptionLevel( interruptionlevel )`
     * @param {String} interruptionlevel
     * @returns {Message}
     */
    setInterruptionLevel(interruptionlevel) {
        this.interruptionlevel = (Object.values(InterruptionLevel).includes(interruptionlevel)) ? interruptionlevel : null;
        return this
    }

    /**
     * `<Message>.setAction( action )`
     * @param {{name: string, url: string}|String|Action} action
     * @returns {Message}
     */
    setAction(action) {
        this.actions.push(new Action(action))
        return this
    }

    /**
     * `<Message>.send()`
     * @param {Chanify?} chanify
     * @returns {Promise?}
     */
    send(chanify) {
        if (!chanify) {
            if (this.#parent) {
                return this.#parent.sendMessage(this)
            } else {
                return null
            }
        } else {
            return chanify.sendMessage(this)
        }
    }

    toJSON() {
        let selfObj = {...this}
        if (selfObj.hasOwnProperty('#parent')) {
            //console.log(`selfObj.hasOwnProperty('#parent')`, 'yes')
            //delete selfObj.#parent
        }
        //console.log(selfObj)
        return selfObj
    }


}

class Action {
    constructor(content) {
        if (typeof content === "string") {
            let cont = content.split("|")
            this.name = cont[0];
            this.URL = new URL(cont[1]);
        } else if (typeof content === "object" && !Array.isArray(content)) {
            this.name = String(content.name)
            this.URL = new URL(content.url || content.URL)
        }
    }

    /**
     * `<Action>.toJSON()`
     * @returns {{name: string, url: string}}
     */
    toJSON() {
        /*let output = {...this}
        return {
            name: output.name,
            URL: String(output.url)
        }*/
        return `${this.name}|${String(this.URL)}`
    }

    /**
     * `<Action>.toString()`
     * @returns {String} "<Action Name>|<Action URL>"
     */
    toString() {
        return `${this.name}|${String(this.URL)}`
    }

    /**
     * `<Action>.setURL()`
     * @param {String|URL} url
     * @returns {Action} self
     */
    setURL(url) {
        this.URL = new URL(url)
        return this
    }

    /**
     * `<Action>.setActionName()`
     * @param {String} actionName
     * @returns {Action}
     */
    setActionName(actionName) {
        this.name = String(actionName)
        return this
    }
}

class Priority {
    /**
     * **Priority** A number between 0 and 10 
     * @param {Number|String} e `10` normal, `5` lower level (from GH README.md)
     * @returns {Priority}
     */
    constructor(e) {

        if (e.constructor.name === 'Priority') {
            this.$ = e.$
        } else {
            this.$ = ( 0 <= Number(e) && Number(e) <= 10 ) ? Number(e) : 10
        }

        
        return this
    }

    /**
     * @returns {Number}
     */
    toNumber() {
        return this.$
    }

    /**
     * @returns {String}
     */
    toString() {
        return String(this.$)
    }

    /**
     * @returns {Number}
     */
    toJSON() {
        return this.$
    }

    /**
     * @returns {Number}
     */
    getPriority() {
        return this.$
    }
}

module.exports = { InterruptionLevel, Sound, AutoCopy, Message, Action, Priority }