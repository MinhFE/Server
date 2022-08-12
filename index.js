//dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./configs/db');
//Import route
const authRoute = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
//Handle error
const {errorHandler} = require('./middlewares/errorHandler');

const port = process.env.APP_PORT || 6000;

const app = express();

//Connect DB
connectDB();

//cors
app.use(cors());

//body parser
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoutes);

app.all('*', (req, res, next) => {
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    next(err);
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running port ${port}`);
});
