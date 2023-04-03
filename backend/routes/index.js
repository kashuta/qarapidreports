const router = require('express').Router();

router.get(/signup/, (req, res) => {
  res.json({ message: 'signup' });
});

module.exports = router;
