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
   - **Returns** `Chanify`
- `<Chanify>.sendMessage( message, useragent? )`
   - **Param** `message` Message • Required
   - **Param** `useragent` String
      - if left `undefined` or `null` the default `chanify.js/<version> (on Node <node version>) +https://github.com/0Charliecat/chanify.js`  useragent is used
   - **Returns** `Axios` response
- `<Chanify>.compose()` • Start a new Message
   - **Returns** `Message`
