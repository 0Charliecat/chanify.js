const Chanify = require('./index')
const key     = require('./key.json')

console.log("Chanify", Chanify)

let chan = new Chanify({
    token: key[0],
    host: "api.chanify.net",
})

let chanURL = new Chanify(`https://api.chanify.net/v1/sender/${key[0]}`)

console.log(`chan: obj conf`, chan)
console.log(`chan: URL conf`, chanURL)

console.log(`\n\n===============================================================\n\n`)

let chanObjConfCompose = chan.compose()
    .setTitle('Hello')
    .setText("It's me from 0Charliecat/chanify.js • "+new Date())
    .setCopy("meowo")
    .setAutoCopy(false)
    .setSound(Chanify.Sound.Bell)
    .setPriority(10)
    .setInterruptionLevel(Chanify.InterruptionLevel.TimeSensitive)
    .setAction({ name: "check this package", URL: "https://github.com/0Charliecat/chanify.js" })

console.log(`chan: obj conf: compose`, chanObjConfCompose)
console.log(`chan: obj conf: compose send`, chanObjConfCompose.send())

console.log(`\n\n===============================================================\n\n`)

let message = new Chanify.Message({})
message.setTitle('Hello')
       .setText("It's me from 0Charliecat/chanify.js • "+new Date())
       .setCopy("meowo")
       .setAutoCopy(false)
       .setSound(Chanify.Sound.Bell)
       .setPriority(10)
       .setInterruptionLevel(Chanify.InterruptionLevel.TimeSensitive)
       .setAction({ name: "check this package", URL: "https://github.com/0Charliecat/chanify.js" })
console.log(`chan: obj conf: send Message from class`, chan.sendMessage(message))

console.log(`\n\n===============================================================\n\n`)

/*console.log(`chan: obj conf: send File`, chan.sendFile(`${__dirname}/README.md`))*/