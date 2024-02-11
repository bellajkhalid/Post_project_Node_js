const express = require("express");
const router = express.Router();
const {dataPost,dataGet} = require('../db_Floder/dbQuery');
// Define route to perform calculation
/**
 * @swagger
 * components:
 *   schemas:
 *     Data_test:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Data_test
 *         title:
 *           type: string
 *           description: The Data_test title
 *         author:
 *           type: string
 *           description: The Data_test author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Data_tests
  *   description: The Data_tests managing API
  */

// Define route to perform calculation
/**
 * @swagger
 * /dbRoute:
 *   post:
 *     summary: Add two numbers
 *     description: Add two numbers passed in the request body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *               b:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Sum of two numbers
 */
router.post('/', (req, res) => {
  const { a, b } = req.body;
  const results = parseInt(a) + parseInt(b);
  // Step 7: Call the async function to handle database operations
  dataPost(a, b, results,res)
    .then(() => {
      console.log('Database operations complete');
      })
    .catch((error) => {
      console.error(error);
    });
});

// Define your GET endpoint
/**
 * @swagger
 * /dbRoute/{id}:
 *   get:
 *     summary: Get data from PostgreSQL database by id
 *     description: Retrieve data from a PostgreSQL database table based on the id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the data to retrieve
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  dataGet(id,req,res)
    .then(() => {
      console.log('Database operations complete');
      })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = router;