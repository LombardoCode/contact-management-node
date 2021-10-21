const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Contact list')
})

module.exports = router;
