const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

require('./model/course');

require('./routes/scheduler')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});