const mongoose = require("mongoose")
assert = require("assert")

const url = "mongodb://localhost/courses-db"
mongoose.Promise = global.Promise
mongoose.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    assert.equal(null, err)
    console.log("Connected successfully to database")

    // turn on following for testing
    // db.close()
  }
)
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error: "))
mongoose.set("debug", false)

module.exports = mongoose.connection