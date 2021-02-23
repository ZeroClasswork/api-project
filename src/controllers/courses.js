const Course = require("../models/course")

module.exports = app => {
  // CREATE COURSE
  app.post("/courses/new", (req, res) => {
    const course = new Course(req.body)

    course
      .save()
      .then((course) => {
        return res.status(200).json(course)
      })
      .catch((err) => {
        res.sendStatus(424)
        throw err.message
      })
  })

  // READ COURSE
  app.get("/courses/:courseSlug", function(req, res) {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOne({department: slugSplit[0], code: slugSplit[1]})
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(404)
      })
  })


}