//Question: You have an endpoint /api/orders that accepts a POST request to create a new order. The request body should include userId (a non-empty string), productId (a non-empty string), and quantity (a positive integer). Write the validation rules for this endpoint.

export const createOrderSchema = {
    userId: {
        in: ['body'],
        isString: true,
        notEmpty: true
    },
    productId: {
        in: ['body'],
        isString: true,
        notEmpty: true
    },
    quantity: {
        in: ['body'],
        isInt: { min: 1 }
    } 
}