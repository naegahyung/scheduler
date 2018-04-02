const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  crn: String,
  crs: String,
  num: String,
  title: String,
  instructor: String,
  room: String,
  start: String,
  end: String,
  duration: Number,
  time: String,
  day: String,
  semester: { type: String, default: 'SPR18' }
});

mongoose.model('course', courseSchema);