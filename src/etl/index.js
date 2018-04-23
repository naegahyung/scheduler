const program = require('commander');
const mongoose = require('mongoose');

require('../model/course');
require('dotenv').config();
const { loadCourses } = require('./course');

program
  .option('--csvFile', 'csvfilePath')
  .parse(process.argv);

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

console.log("Inserting data into database");
loadCourses(program.csvFile);