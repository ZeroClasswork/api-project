const express = require("express")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

require('./data/courses-db')

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})