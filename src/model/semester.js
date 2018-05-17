const mongoose = require('mongoose');

const Course = mongoose.model('course');

const semester = new mongoose.Schema({
  semester: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

mongoose.model('semester', semester);