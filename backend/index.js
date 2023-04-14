/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { authMiddleware } = require('./middlewares');
// const router = require('./routes/index');
const authRouter = require('./routes/authRouter');
const dataRouter = require('./routes/dataRouter');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'));

// add swagger api doc
if (envFile === '.env.development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerJSDoc = require('swagger-jsdoc');
  const swaggerOptions = require('./utils/swagger/swaggerOptions');

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use(process.env.SWAGGER_API_DOC, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Routes
// app.use('/api/v1/', router);
app.use('/api/v2/', authRouter);
app.use('/api/v3/', authMiddleware, dataRouter);
// app.use(handleErrorsMiddleware);

// Server

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});

module.exports = app;
