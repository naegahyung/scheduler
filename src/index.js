const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

require('./model/course');

require('./routes/scheduler')(app);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});