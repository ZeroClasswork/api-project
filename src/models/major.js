const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MajorSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  courses_required: [{ type: Schema.Types.ObjectId, ref: "Course" }],
})

module.exports = mongoose.model("Major", MajorSchema)