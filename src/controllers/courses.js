const course = require("../models/course")
const Course = require("../models/course")

module.exports = app => {
  // CREATE COURSE
  app.post("/courses/new", (req, res) => {
    const course = new Course(req.body)

    course
      .save()
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(424)
      })
  })

  // READ COURSE
  app.get("/courses/:courseSlug", (req, res) => {
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

  // UPDATE COURSE
  app.patch("/courses/:courseSlug/edit_department", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseSlug/edit_code", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseSlug/edit_name", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseSlug/edit_description", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseSlug/edit_units", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.put("/courses/:courseSlug", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {department: slugSplit[0], code: slugSplit[1]},
      req.body,
      {new: true}
    )
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  // CHANGE COURSE-COURSE ASSOCIATIONS
  app.patch("/courses/:courseOneSlug/add_prerequisite/:courseTwoSlug", async (req, res) => {
    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        courseOne.prerequisites.unshift(courseTwo._id)
        courseTwo.postrequisites.unshift(courseOne._id)
        courseOne.save()
        courseTwo.save()
        return courseOne
      })
      .then((courseOne) => {
        return res.json(courseOne)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseOneSlug/delete_prerequisite/:courseTwoSlug", async (req, res) => {
    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        courseOne.prerequisites.remove(courseTwo._id)
        courseTwo.postrequisites.remove(courseOne._id)
        courseOne.save()
        courseTwo.save()
        return courseOne
      })
      .then((courseOne) => {
        return res.json(courseOne)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseOneSlug/add_corequisite/:courseTwoSlug", async (req, res) => {
    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        courseOne.corequisites.unshift(courseTwo._id)
        courseOne.save()
        return courseOne
      })
      .then((courseOne) => {
        return res.json(courseOne)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  app.patch("/courses/:courseOneSlug/delete_corequisite/:courseTwoSlug", async (req, res) => {
    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        courseOne.corequisites.remove(courseTwo._id)
        courseOne.save()
        return courseOne
      })
      .then((courseOne) => {
        return res.json(courseOne)
      })
      .catch((err) => {
        return res.sendStatus(400)
      })
  })

  // DELETE COURSE
  app.delete("/courses/:courseSlug", (req, res) => {
    var courseSlug = req.params.courseSlug
    var slugSplit = courseSlug.split("_")
    Course.findOneAndDelete({department: slugSplit[0], code: slugSplit[1]}, (err) => {
      if (err) {
        return res.sendStatus(404)
      } else {
        return res.sendStatus(200)
      }
    })
  })
}