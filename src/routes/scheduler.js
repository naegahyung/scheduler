const mongoose = require('mongoose');
const _ = require('lodash');

const Course = mongoose.model('course');

module.exports = app => {
  app.get('/api/courses/:semester', async (req, res) => {
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
    ]);
    let final = labelDays(result);
    res.send(final);
  });

  app.get('/api/crs/:semester', async (req, res) => {
    const semester = req.params.semester;
    let result = await Course.distinct('crs', { semester });
    res.send(result);
  });

  app.get('/api/rooms/:semester', async (req, res) => {
    const semester = req.params.semester;
    let result = await Course.distinct('room', { semester });
    res.send(result);
  });
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

