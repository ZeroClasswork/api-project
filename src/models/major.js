const mongoose = require('mongoose');

const { Schema } = mongoose;

const MajorSchema = new Schema({
  school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  courses_required: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Major', MajorSchema);
