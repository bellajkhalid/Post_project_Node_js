// Import required modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const Data_router = require('./route/dbRoute');

// Create an instance of the Express app
const app = express();

// Configure Express to use JSON parsing middleware
app.use(express.json());

//========================================================================
// Mount the Swagger UI to serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount the data router at the '/dbRoute' endpoint
app.use("/dbRoute", Data_router);
//=========================================================================

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


