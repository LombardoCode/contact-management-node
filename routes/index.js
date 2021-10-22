const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello Node.js");
});

// API
router.use('/api', require('./api/api'))

module.exports = router;