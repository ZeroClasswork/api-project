const Major = require("../models/major")
const Course = require("../models/course")

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
        return res.sendStatus(424)
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

  // CHANGE MAJOR-COURSE ASSOCIATIONS
  app.patch("/majors/:majorSlug/add_course_requirement/:courseSlug", async (req, res) => {
    var majorSlug = req.params.majorSlug
    var courseSlug = req.params.courseSlug
    var slugOneSplit = majorSlug.split("_")
    var slugTwoSplit = courseSlug.split("_")

    Major.findOne(
      {type: slugOneSplit[0], name: slugOneSplit[1]},
    )
      .then(async (major) => {
        course = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        major.courses_required.unshift(course._id)
        major.save()
        return major
      })
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        console.log(err)
        return res.sendStatus(400)
      })
  })

  app.patch("/majors/:majorSlug/delete_course_requirement/:courseSlug", async (req, res) => {
    var majorSlug = req.params.majorSlug
    var courseSlug = req.params.courseSlug
    var slugOneSplit = majorSlug.split("_")
    var slugTwoSplit = courseSlug.split("_")

    Major.findOne(
      {type: slugOneSplit[0], name: slugOneSplit[1]},
    )
      .then(async (major) => {
        course = await Course.findOne(
          {department: slugTwoSplit[0], code: slugTwoSplit[1]},
        )
        major.courses_required.remove(course._id)
        major.save()
        return major
      })
      .then((major) => {
        return res.json(major)
      })
      .catch((err) => {
        console.log(err)
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