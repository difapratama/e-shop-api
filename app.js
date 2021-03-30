const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

// view engine setup
app.set('view engine', 'ejs');

app.use(cors());
app.options('*', cors());

const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// Routes
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready ...');
})
.catch((err) => {
    console.log(err);
})

app.listen(5000, () => { 
    console.log('server listening on http://localhost:5000');
})