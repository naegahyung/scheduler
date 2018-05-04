const program = require('commander');

const { loadCourses } = require('./course');

program
  .option('--csvFile', 'csvfilePath')
  .parse(process.argv);

console.log("Inserting data into database");
loadCourses(program.csvFile);