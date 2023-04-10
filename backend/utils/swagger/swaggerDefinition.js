const schemas = require('./index');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'QaRapidReport API',
    version: '1.0.0',
    description: 'Documentation for QaRapidReport API',
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1',
    },
  ],
  components: {
    schemas,
  },
};

module.exports = swaggerDefinition;
