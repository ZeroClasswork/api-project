const School = require("../models/school")

module.exports = app => {
  // CREATE SCHOOL
  app.post("/schools/new", (req, res) => {
    const school = new School(req.body)

    school
      .save()
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(424)
      })
  })

  // READ SCHOOL
  app.get("/schools/:schoolSlug", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOne({name: slugSplit.join(" ")})
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(404)
      })
  })

  // UPDATE SCHOOL
  app.patch("/schools/:schoolSlug/edit_name", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndUpdate(
      {name: slugSplit.join(" ")},
      req.body,
      {new: true}
    )
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/schools/:schoolSlug/edit_city", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndUpdate(
      {name: slugSplit.join(" ")},
      req.body,
      {new: true}
    )
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/schools/:schoolSlug/edit_state", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndUpdate(
      {name: slugSplit.join(" ")},
      req.body,
      {new: true}
    )
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/schools/:schoolSlug/edit_country", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndUpdate(
      {name: slugSplit.join(" ")},
      req.body,
      {new: true}
    )
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.put("/schools/:schoolSlug", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndUpdate(
      {name: slugSplit.join(" ")},
      req.body,
      {new: true}
    )
      .then((school) => {
        return res.json(school)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  // DELETE SCHOOL
  app.delete("/schools/:schoolSlug", (req, res) => {
    var schoolSlug = req.params.schoolSlug
    var slugSplit = schoolSlug.split("_")
    School.findOneAndDelete({name: slugSplit.join(" ")}, (err) => {
      if (err) {
        return res.sendStatus(404)
      } else {
        return res.sendStatus(200)
      }
    })
  })
}