const Major = require("../models/major")

module.exports = app => {
  // CREATE MAJOR
  app.post("/majors/new", (req, res) => {
    const major = new Major(req.body)

    major
      .save()
      .then((major) => {
        return res.status(200).json(major)
      })
      .catch((err) => {
        res.sendStatus(424)
        throw err.message
      })
  })

  // READ MAJOR
  app.get("/majors/:majorSlug", (req, res) => {
    var majorSlug = req.params.majorSlug
    var slugSplit = majorSlug.split("_")
    Major.findOne({type: slugSplit[0], name: slugSplit[1]})
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        return res.sendStatus(404)
      })
  })

  // UPDATE MAJOR
  app.patch("/majors/:majorSlug/edit_type", (req, res) => {
    var majorSlug = req.params.majorSlug
    var slugSplit = majorSlug.split("_")
    Major.findOneAndUpdate(
      {type: slugSplit[0], name: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/majors/:majorSlug/edit_name", (req, res) => {
    var majorSlug = req.params.majorSlug
    var slugSplit = majorSlug.split("_")
    Major.findOneAndUpdate(
      {type: slugSplit[0], name: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.put("/majors/:majorSlug", (req, res) => {
    var majorSlug = req.params.majorSlug
    var slugSplit = majorSlug.split("_")
    Major.findOneAndUpdate(
      {type: slugSplit[0], name: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  // DELETE MAJOR
  app.delete("/majors/:majorSlug", (req, res) => {
    var majorSlug = req.params.majorSlug
    var slugSplit = majorSlug.split("_")
    Major.findOneAndDelete({type: slugSplit[0], name: slugSplit[1]}, (err) => {
      if (err) {
        return res.sendStatus(404)
      } else {
        return res.sendStatus(200)
      }
    })
  })
}