const School = require("../models/school")
const Course = require("../models/course")

module.exports = app => {
  // CREATE COURSE
  app.post("/schools/:schoolSlug/courses/new", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const slugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: slugSplit.join(" ")})

    req.body.school = school._id

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
  app.get("/schools/:schoolSlug/courses/:courseSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOne({school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]})
      .then((course) => {
        return res.json(course)
      })
      .catch((err) => {
        return res.sendStatus(404)
      })
  })

  // UPDATE COURSE
  app.patch("/schools/:schoolSlug/courses/:courseSlug/edit_department", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseSlug/edit_code", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseSlug/edit_name", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseSlug/edit_description", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseSlug/edit_units", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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

  app.put("/schools/:schoolSlug/courses/:courseSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndUpdate(
      {school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]},
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
  app.patch("/schools/:schoolSlug/courses/:courseOneSlug/add_prerequisite/:courseTwoSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {school: school._id, department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {school: school._id, department: slugTwoSplit[0], code: slugTwoSplit[1]},
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
        console.log(err)
        return res.sendStatus(400)
      })
  })

  app.patch("/schools/:schoolSlug/courses/:courseOneSlug/delete_prerequisite/:courseTwoSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {school: school._id, department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {school: school._id, department: slugTwoSplit[0], code: slugTwoSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseOneSlug/add_corequisite/:courseTwoSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {school: school._id, department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {school: school._id, department: slugTwoSplit[0], code: slugTwoSplit[1]},
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

  app.patch("/schools/:schoolSlug/courses/:courseOneSlug/delete_corequisite/:courseTwoSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseOneSlug = req.params.courseOneSlug
    var courseTwoSlug = req.params.courseTwoSlug
    var slugOneSplit = courseOneSlug.split("_")
    var slugTwoSplit = courseTwoSlug.split("_")

    Course.findOne(
      {school: school._id, department: slugOneSplit[0], code: slugOneSplit[1]},
    )
      .then(async (courseOne) => {
        courseTwo = await Course.findOne(
          {school: school._id, department: slugTwoSplit[0], code: slugTwoSplit[1]},
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
  app.delete("/schools/:schoolSlug/courses/:courseSlug", async (req, res) => {
    const schoolSlug = req.params.schoolSlug
    const schoolSlugSplit = schoolSlug.split("_")
    const school = await School.findOne({name: schoolSlugSplit.join(" ")})

    var courseSlug = req.params.courseSlug
    var courseSlugSplit = courseSlug.split("_")
    Course.findOneAndDelete({school: school._id, department: courseSlugSplit[0], code: courseSlugSplit[1]}, (err) => {
      if (err) {
        return res.sendStatus(404)
      } else {
        return res.sendStatus(200)
      }
    })
  })
}