const { readdirSync } = require('fs');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
