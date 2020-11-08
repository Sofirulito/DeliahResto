const router = require('express').Router();
const db = require('../models');

const middleware = require('./middlewares');
const apiProductsRouter = require('./api/products');
const apiUsersRouter = require('./api/users');
const apiOrderRouter = require('./api/orders')

router.use('/orders', apiOrderRouter);
router.use('/products', middleware.checkToken, apiProductsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;