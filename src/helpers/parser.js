const csv = require('csvtojson');

/**
 * Retrieve data from the given CSV file and return it in readable fashion
 * @param {String} filePath file path to CSV file
 */
const parseCSVFile = (filePath) => {
  let data = [];
  return new Promise((resolve, reject) => {
    csv({ noheader: true })
      .fromFile(filePath)
      .on('json' , (jsonObj) => {
        data.push(jsonObj);
      })
      .on('done', (error) => {
        if (error) reject(error);
        resolve(organizeData(data));
      });
  });
};

/**
 * Organize the raw data retrieved from the CSV file.
 * @param {listOf-object} data list of objects retrieved from a CSV file 
 */
const organizeData = (data) => {
  if (data.length === 0) {
    return [];
  }

  const header = data[0];
  data.shift();
  const organized = [];
  const keys = Object.keys(header);
  data.map(course => {
    let o = {};
    for (let key of keys) {
      let fieldName = header[key];
      if (fieldName !== '') {
        o[fieldName] = course[key]; 
      }
    }
    organized.push(o);
  });
  return modifyTimeFormat(organized);
};

/**
 * Divide "XXXX-XXXX" formmated time to start, end, and duration.
 * @param {listOf-object} data list of objects with the field called "time", with capitalized T
 */
const modifyTimeFormat = data => {
  let res = [];
  for (let c of data) {
    const formattedTime = convertNumberToTime(c.Time);
    res.push({ ...c, ...formattedTime });
  }
  return res;
};

/**
 * Convert "XXXX-XXXX" formatted time to meaningful time tuple
 * @param {String} time "XXXX-XXXX" formatted time 
 */
const convertNumberToTime = time => {
  if (!(/\d+-\d+/.test(time)) || time.length !== 9) {
    return new Error("Incorrectly formatted input. Check the input.");
  }

  const timeFrame = time.split('-');
  if (!checkForTimeValidity(timeFrame)) {
    return new Error("Incorrect time range was inputted.");
  }

  const startHour = timeFrame[0].substring(0, 2);
  const startMin = timeFrame[0].substring(2, 4);
  const endHour = timeFrame[1].substring(0, 2);
  const endMin = timeFrame[1].substring(2, 4);
  const duration = (parseInt(endHour) - parseInt(startHour)) * 60 + parseInt(endMin) - parseInt(startMin);
  return {
    startTime: timeFrame[0], 
    endTime: timeFrame[1],
    duration: duration
  };
};

/**
 * Check if the given array of timeframes is within 0 ~ 24 hours range 
 * @param {listOf-String} time [ "XXXX", "XXXX" ] 
 */
const checkForTimeValidity = time => {
  let s = parseInt(time[0]);
  let e = parseInt(time[1]);
  return !(s < 0 || s > 2400 || e < 0 || e > 2400);
};

module.exports = {
  parseCSVFile,
  organizeData,
  modifyTimeFormat,
  convertNumberToTime,
  checkForTimeValidity
};