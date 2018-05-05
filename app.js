const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
   const error = new Error('Not found');
   error.status(404);
   next(error);
});

app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.json({
      error: {
         message:err.message
      }
   })
})

module.exports = app;