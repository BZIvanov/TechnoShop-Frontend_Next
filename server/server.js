const { readdirSync } = require('fs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('./database');

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
