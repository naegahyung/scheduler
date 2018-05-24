const mongoose = require('mongoose');
const _ = require('lodash');

const Course = mongoose.model('course');
const { parseGoogleSheetData, getData, saveData } = require('../etl/syncGoogSprdSht');

module.exports = app => {
  app.get('/api/:semester/courses', async (req, res) => {
    const semester = req.params.semester;
    let result = await Course.aggregate([
      {
        "$match": { start: { $ne: null }, semester }
      },
      { 
        $group: {
          _id: "$room",
          sessions: { $push: "$$ROOT" },
        }
      },
      { "$sort": { "_id": 1 } },
    ]);
    let final = labelDays(result);
    res.send(final);
  });

  app.get('/api/:semester/crs', async (req, res) => {
    const semester = req.params.semester;
    let result = await Course.distinct('crs', { semester });
    res.send(result);
  });

  app.get('/api/:semester/:spreadsheetId/syncData', async (req, res) => {
    const semester = req.params.semester;
    const status = await parseGoogleSheetData(req.params.spreadsheetId);
    if (status === 200) {
      let result = await Course.aggregate([
        {
          "$match": { start: { $ne: null }, semester }
        },
        { 
          $group: {
            _id: "$room",
            sessions: { $push: "$$ROOT" },
          }
        },
        { "$sort": { "_id": 1 } },
      ]);
      result = labelDays(result);
      res.status(status).send(result);
    } else {
      res.status(500).send("Failed to sync");
    }
  });
  
  app.put('/api/:semester/:spreadsheetId/saveData', async (req, res) => {
    const { changes } = req.body;
    const data = await getData(req.params.spreadsheetId); 
    const values = data.values;

    const header = values[0];
    const CRNIndex = header.indexOf('CRN');
    const crsIndex = header.indexOf('Crs');
    const numIndex = header.indexOf('Num');
    const timeIndex = header.indexOf('Time');
    const roomIndex = header.indexOf('Room');
    const dayIndex = header.indexOf('Day');

    Object.keys(changes).forEach(key => {
      let { crn, crs, num, time, day, room } = changes[key];
      let index = values.findIndex(e => {
        return e[CRNIndex] === crn && e[crsIndex] === crs && e[numIndex] === num;
      })
      if (index === -1) {
        return res.status(500).send('Record not found');
      } 
      let newElement = values[index];
      newElement[timeIndex] = time;
      newElement[dayIndex] = day;
      newElement[roomIndex] = room;
      values.splice(index, 1, newElement);
    });

    await saveData(req.params.spreadsheetId, { values });
    
    const status = await parseGoogleSheetData(req.params.spreadsheetId);
    const semester = req.params.semester;
    if (status === 200) {
      let result = await Course.aggregate([
        {
          "$match": { start: { $ne: null }, semester }
        },
        { 
          $group: {
            _id: "$room",
            sessions: { $push: "$$ROOT" },
          }
        },
        { "$sort": { "_id": 1 } },
      ]);
      result = labelDays(result);
      res.status(status).send(result);
    } else {
      res.status(500).send("Failed to sync");
    }
  })
};

const labelDays = (data) => {
  return data.map(room => {
    let M = false;
    let T = false;
    let W = false;
    let R = false;
    let F = false;
   
    let groupedByDay = { M: [], T: [], W: [], R: [], F: [] };
    room.sessions.forEach(session => {
      M = checkIfDayExists(groupedByDay, 'M', session, M);
      T = checkIfDayExists(groupedByDay, 'T', session, T);
      W = checkIfDayExists(groupedByDay, 'W', session, W);
      R = checkIfDayExists(groupedByDay, 'R', session, T);
      F = checkIfDayExists(groupedByDay, 'F', session, F);
    });

    return { ...room, sessions: groupedByDay, M, T, W, R, F };
  });
};

const checkIfDayExists = (o, day, c, bool) => {
  if (c.day.includes(day)) {
    o[day].push(c);
    return true;
  }
  return bool;
};

