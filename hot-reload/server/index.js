let router = require('express').Router()

router.get('/', function (req, res) {
  res.send('This is index page of the emulator. Welcome!')
})

module.exports = router;
