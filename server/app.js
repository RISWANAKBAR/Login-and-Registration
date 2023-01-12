const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const contactrouter = require('./router/Profilerouter')
const cors = require('cors')


app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())
app.use(express.json())
app.use("/api", contactrouter)

app.listen(5000, () => {
    console.log("localhost5000")
})
