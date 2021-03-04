const crypto = require("crypto")

const APIUser = require("../models/api_user")

module.exports = app => {
  app.post("/users/new", (req, res) => {
    const user = new APIUser({email: req.body.email})

    user
      .save()
      .then((user) => {
        return res.json({"Api-Key": user.generateKey()})
      })
      .catch((err) => {
        return res.sendStatus(424)
      })
  })

  app.patch("/users/me/regenerate_key", (req, res) => {
    APIUser.findOne({email: req.body.email})
      .then((user) => {
        key = crypto.randomBytes(8).toString("hex")
        apiKey = crypto.createHash(process.env.ALGORITHM).update(key).digest("hex")
        user.apiKey = apiKey
        user.save()
        return key
      })
      .then((key) => {
        return res.json({"Api-Key": key})
      })
      .catch((err) => {
        return res.sendStatus(404)
      })
  })

  app.get("/unauthorized", (req, res) => {
    return res.status(401).json({"Error": "You must be authorized to do that"})
  })
}