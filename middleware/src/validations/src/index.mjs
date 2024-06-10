const express = require("express");
const { query } = require("express-validator");

const app = express();

app.use(express.json());

/* Question: You have an endpoint /api/users that accepts a GET request. The request can optionally include a page query parameter to specify the page number of users to return. The page parameter should be a positive integer. Write the validation rules for this endpoint.*/

app.get('/api/users',
    query("page").optional().isInt({ min: 1 }).withMessage("page number should be greater than 1"),
    (request, response) => {
        console.log(request);
    }
 )