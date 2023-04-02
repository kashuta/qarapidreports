const router = require('express').Router();

router.post(/signup/, (req, res) => {
  res.json({ message: 'signup' });
});

module.exports = router;
