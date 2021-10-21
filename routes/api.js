const router = require('express').Router();
const apiContactRouter = require('./contact')

router.use('/contact', apiContactRouter)


module.exports = router;
