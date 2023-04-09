const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { sequelize } = require('./db/models');
const { handleErrorsMiddleware, authMiddleware } = require('./middlewares');
const router = require('./routes/index');

const app = express();
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({ path: envFile });
// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use('/api', router);
app.use(handleErrorsMiddleware);

// Server

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});

module.exports = app;
