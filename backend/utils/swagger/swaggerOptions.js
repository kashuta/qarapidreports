const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: [
    '././routes/*.js',
    '././controllers/*.js',
    '././middlewares/*.js',
    '././exceptions/*.js',
    '././db/models/*.js',
  ],
};

module.exports = options;
