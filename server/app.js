const express = require('express');
//const router = require('./src/routes/api')
const app = express();
const bodyParser = require('body-parser');

const router = require('./src/routes/api');

//security middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');

//Database
const db = require('./db');

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });

app.use(limiter);

app.use('/api/v1', router);

// Export the app object
module.exports = app;