const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: ['./utils/swagger/*.yaml'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
