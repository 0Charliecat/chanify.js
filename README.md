# `chanify.js`

[Chanify](https://github.com/chanify/chanify) NodeJS sender api wapper

---

## Example

```javascript
const Chanify = require("chanify.js")

const chan = new Chanify({
  token: "< INSERT YOUR TOKEN HERE >",
  host: "api.chanify.net"
})

chan.compose()
    .setTitle("👋 Heya!")
    .setText("It's me from JS")
    .setCopy("https://npmjs.com/chanify.js")
    .setAutoCopy(true)
    .setSound(Chanify.Sound.Bell)
    .setPriority(10)
    .setInterruptionLevel(Chanify.InterruptionLevel.TimeSensitive)
    .setAction({ name: "Check out this package", URL: "https://github.com/0Charliecat/chanify.js" })
    .send()
```

---

## Table of contents

- class `Chanify`
- class `Message`
- class `Action`
- class `Priority`
- object `InteruptionLevel`
- object `Sound`
- object `AutoCopy`

---

## Documentation

### class `Chanify`

The main class of this package.

- `constructor( options ) || new Chanify( options )`
   - `options` String or URL
      - must be the whole url with the key
   - `options` object
      - `token` String: Token from Chanify
      - `host` String: host of the api, i.e. `api.chanify.net`
      - `https` Boolean: if HTTPS is enabled or not • defaults to `true`
      - `apiVersion` String: defaults to `v1`
   - **Returns** [`Chanify`](https://github.com/0Charliecat/chanify.js#class-chanify)
- `<Chanify>.sendMessage( message, useragent? )`
   - **Param** `message` [Message](https://github.com/0Charliecat/chanify.js#class-message) • Required
   - **Param** `useragent` String
      - if left `undefined` or `null` the default `chanify.js/<version> (on Node <node version>) +https://github.com/0Charliecat/chanify.js`  useragent is used
   - **Returns** `Axios` response
- `<Chanify>.compose()` • Start a new [Message](https://github.com/0Charliecat/chanify.js#class-message)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)

### class `Message`

The reason why u probbs use this package

- `constructor( content, parent ) || new Message( content, parent ) || <Chanify>.compose()`
   - **Param** `content` object
      - `title` String
      - `text` String
      - `copy` String
      - `autocopy` Boolean || 0 || 1 || member of [`Chanify.AutoCopy`](https://github.com/0Charliecat/chanify.js#object-autocopy)
      - `sound` String || null || member of [`Chanify.Sound`](https://github.com/0Charliecat/chanify.js#object-sound)
      - `priority` Number || [Priority](https://github.com/0Charliecat/chanify.js#class-priority)
      - `interruptionlevel` String || null || member of [`Chanify.InterruptionLevel`](https://github.com/0Charliecat/chanify.js#object-interruptionlevel)
      - `actions` Object || Object[] || [Action](https://github.com/0Charliecat/chanify.js#class-action) || [Action](https://github.com/0Charliecat/chanify.js#class-action)[]
   - **Param** `parent` [Chanify](https://github.com/0Charliecat/chanify.js#class-chanify)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setTitle( title )` • Sets the title
   - **Param** `title` String
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setText( text )` • Sets the text
   - **Param** `text` String
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setCopy( copy )` • Sets the text of AutoCopy
   - **Param** `copy` String
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setAutoCopy( autocopy )` • Enables or disables autocopy
   - **Param** `autocopy` Boolean || 0 || 1 || member of [`Chanify.AutoCopy`](https://github.com/0Charliecat/chanify.js#object-autocopy)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setSound( sound )` • Sets the sound played when notification is receved on device
   - **Param** `sound` String || member of [`Chanify.Sound`](https://github.com/0Charliecat/chanify.js#object-sound)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setPriority( priority )` • Sets the priority of the notification (see official documentation)
   - **Param** `priority` Number >= 0 && Number <= 10 || [Priority](https://github.com/0Charliecat/chanify.js#class-priority)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setInterruptionLevel( interruptionlevel )` • Sets the interruprion level (see official documentation)
   - **Param** `interruptionlevel` String || member of  [`Chanify.InterruptionLevel`](https://github.com/0Charliecat/chanify.js#object-interruptionlevel)
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.setAction( action )` • Sets action(s) appended to the message
   - **Param** `action` Object || Object[] || [Action](https://github.com/0Charliecat/chanify.js#class-action) || [Action](https://github.com/0Charliecat/chanify.js#class-action)[]
   - **Returns** [`Message`](https://github.com/0Charliecat/chanify.js#class-message)
- `<Message>.send( chanify? )` • Sends the message
   - **Param** `chanify` [Chanify](https://github.com/0Charliecat/chanify.js#class-chanify) • can be ignored if was provided via the `constructor` or message was created via `<Chanify>.compose`
   - **Returns** `Promise`
- `<Message>.toJSON()` • makes message as ready to send JSON body
   - **Returns** `Any`
