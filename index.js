const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))


async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:131313alex131313@cluster0.c1xnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}
start()