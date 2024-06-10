// const express = require("express");
import express, { request, response } from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";

import { createOrderSchema } from "./utils/validationschema.js";

const app = express();

app.use(express.json());

/* Question: You have an endpoint /api/users that accepts a GET request. The request can optionally include a page query parameter to specify the page number of users to return. The page parameter should be a positive integer. Write the validation rules for this endpoint.*/

app.get('/api/users',
    [
        query("page").optional().isInt({ min: 1 }).withMessage("page number should be greater than 1")
    ],
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(200).send('❤');
    }
);

/* Question: You have an endpoint /api/products that accepts a GET request. The request can optionally include a category query parameter to filter products by category. The category parameter should be a non-empty string. Write the validation rules for this endpoint.*/
app.get('/api/products',
    [
        query("category").notEmpty(),
    ],
    (request, response) => {
         const errors = validationResult(request)
         if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(200).send('❤');
    }
);
/*Question: You have an endpoint /api/orders that accepts a GET request. The request can optionally include a date query parameter to filter orders by date. The date parameter should be a valid date string. Write the validation rules for this endpoint.*/
app.get('/api/orders', 
    [
        query("date").optional().isDate().withMessage("param should be a valid date")
    ],
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(200).send('❤');
    }
)

/*Question: You have an endpoint /api/transactions that accepts a GET request. The request can optionally include a status query parameter to filter transactions by status. The status parameter should be one of the following values: pending, completed, or failed. Write the validation rules for this endpoint.*/
app.get('/api/transactions',
    [
        query("status").optional().isIn(["pending", "completed", "failed"]).withMessage("status should be one of pending, completed or failed")
    ],
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(200).send('❤');
    }
)


// VALIDATE BODY PARAMS
// Question: You have an endpoint /api/users that accepts a POST request to create a new user. The request body should include name (a non-empty string), email (a valid email address), and password (a string of at least 8 characters). Write the validation rules for this endpoint.
app.post('/api/users',
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 8 })
    ],
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(200).send('❤');
    }
)
// Question: You have an endpoint /api/products that accepts a POST request to create a new product. The request body should include name (a non-empty string), price (a positive number), and category (a non-empty string). Write the validation rules for this endpoint.
app.post('/api/products', 
    [
        body('name').isString().notEmpty().withMessage("name should not be empty"),
        body("price").notEmpty().isInt({min: 1}).withMessage("price sould not be empty"),
        body("category").notEmpty().isString().withMessage("category should not be empty")
    ],

    (request, response) => {
        const data = matchedData(request);
        console.log(data)
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array() })
        }

        response.status(201).send({message: "created succesfully"});
    }
)
//Question: You have an endpoint /api/orders that accepts a POST request to create a new order. The request body should include userId (a non-empty string), productId (a non-empty string), and quantity (a positive integer). Write the validation rules for this endpoint.

app.post('/api/orders',
    checkSchema(createOrderSchema),
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        response.status(201).send('❤');
    }
);

 app.listen(3000, console.log("app started"))