const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

require('./src/model/course');

require('./src/routes/scheduler')(app);

app.use(express.static('client/build/static'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});