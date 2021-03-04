const express = require("express")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressValidator())

require("./data/courses-db")

require("./src/controllers/schools")(app)
require("./src/controllers/courses")(app)
require("./src/controllers/majors")(app)

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})

module.exports = app