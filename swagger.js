const swaggerJSDoc = require('swagger-jsdoc');
// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Calculator APIi',
    version: '1.0.0',
    description: 'API to perform basic arithmetic operations',
  },
};

// Swagger options
const options = {
  swaggerDefinition,
  servers: 
    {
        url: "http://localhost:3000",
    },
  // Paths to files containing OpenAPI definitions
  apis: ['./route/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;