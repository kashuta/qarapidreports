const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'QaRapidReport API',
    version: '2.0.0',
    description: 'Documentation for QaRapidReport API',
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v2',
    },
  ],
};

module.exports = swaggerDefinition;
