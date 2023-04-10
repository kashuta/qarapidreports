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
    credentials: true,
  }),
);
app.use(express.json());

// add swagger api doc
if (envFile === '.env.development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerJSDoc = require('swagger-jsdoc');
  const swaggerOptions = require('./utils/swagger/swaggerOptions');

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use(process.env.SWAGGER_API_DOC, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Routes
app.use('/api/v1/', router);
app.use(handleErrorsMiddleware);

// Server

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});

module.exports = app;
