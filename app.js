// Establishing a connection to a PostgreSQL database using a connection pool

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const Data_router = require('./route/dbRoute');

const app = express();
const port = 3000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/dbRoute", Data_router);


//=========================================================================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


