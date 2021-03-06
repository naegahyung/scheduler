const fs = require('fs');
const mongoose = require('mongoose');
const { google } = require('googleapis');

require('../model');
//const privateKey = require('../assets/client_secret.json');
const { organizeData } = require('../helpers/parser');

const Course = mongoose.model('course');

const key = {
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL
}


const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

function getData(spreadsheetId) {
  return new Promise(function(resolve, reject) {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId,
      range: 'A1:Q175'
    }, async function (err, response) {
      if (err) reject('The API returned an error: ' + err);
      resolve(response.data);
    });
  })
}

function saveData(spreadsheetId, body) {
  return new Promise(function(resolve, reject) {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.update({
      auth: jwtClient,
      spreadsheetId,
      range: 'MAIN!A1:Q175',
      resource: body,
      valueInputOption: 'raw',
    }, async function (err, { status, data }) {
      if (err) reject('The API returned an error: ' + err);
      resolve(data);
    });
  })
}

function parseGoogleSheetData(spreadsheetId) {
  return new Promise(function(resolve, reject) {
    let sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId,
      range: 'A1:Q175'
    }, async function (err, response) {
      if (err) reject('The API returned an error: ' + err);
      let values = response.data.values.map(v => {
        return Object.assign({}, v);
      });

      const result = organizeData(values);
      
      try {
        await Course.collection.drop();
      } catch (e) {
        reject("Failed to drop collection: ", e);
      }
      let counter = 0;
      const total = result.length; 
      result.forEach(async c => {
        let course = new Course({
          crn: removeWhiteSpace(c.CRN),
          crs: removeWhiteSpace(c.Crs),
          num: removeWhiteSpace(c.Num),
          grad: c.grad,
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
        console.log(`Done: ${counter}-${total}`);
        if (counter === total) {
          console.log(`Loading data from Google Sheet is successfully complete!`);
          resolve(response.status);
        }
      });
    });
  })
}

const removeWhiteSpace = string => (
  string.replace(/\s+/g, '')
);

module.exports = {
  parseGoogleSheetData,
  getData,
  saveData
};