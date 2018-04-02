const mongoose = require('mongoose');

const Course = mongoose.model('course');
const { parseCSVFile } = require('../helpers/parser');

const loadCourses = async filePath => {
  if (filePath) {
    console.log(`File is provided at: ${filePath}`);
  } else {
    console.log(`File being parsed from the assets folder!`);
    filePath = __dirname + "/../assets/masterlist.csv";
  }
  let counter = 0;
  let l = await parseCSVFile(filePath);
  for (let c of l) {
    let course = new Course({
      crn: c.CRN,
      crs: c.Crs,
      num: c.Num,
      title: c['Title Short'],
      instructor: c.Instructor,
      room: c.Room,
      time: c.Time,
      start: c.startTime,
      end: c.endTime,
      duration: c.duration,
      day: c.Day
    });
    await course.save();
    counter++;
    if (counter === l.length) {
      console.log(`Loading data from ${filePath} is successfully complete!`);
      mongoose.connection.close();
    }
  }
}

module.exports = {
  loadCourses
}