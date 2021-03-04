const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const APIUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  apiKey: {
    type: String,
    default: crypto
      .createHash(process.env.ALGORITHM)
      .update(crypto.randomBytes(8).toString('hex'))
      .digest('hex'),
    unique: true,
  },
});

module.exports = mongoose.model('APIUser', APIUserSchema);
