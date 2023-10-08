const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
const user = require('./routes/user.route');
const product = require('./routes/product.route');
const user_products = require('./routes/user-product.route');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log('Connection with database established...') }, 
        error => { console.log('Failed to connect to MongoDB', error) }
    );


app.use('/', express.static('pages'));  // middleware
app.use(cors({
    // origin: '*'
    origin: [
        'https://www.example.com',
        'http://localhost:8000'
    ]
}));

app.use('/api/users', user);    // middleware
// app.use('/api/products', product);  // middleware
app.use('/api/users-products', user_products)  // middleware
app.use('/api-docs',            // middleware
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument.options)
);

module.exports = app;