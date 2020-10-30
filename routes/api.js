const router = require('express').Router();

const middleware = require('./middlewares');
const apiProductsRouter = require('./api/products');
const apiUsersRouter = require('./api/users');

router.use('/products', middleware.checkToken, apiProductsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;