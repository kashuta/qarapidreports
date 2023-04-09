const router = require('express').Router();

router.get('/signup', async (req, res, next) => {
  try {
    // Handle signup logic here
    res.send('signup');
  } catch (err) {
    next(err);
  }
});

router.get('/test', (req, res, next) => {
  try {
    throw new Error('Test error');
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // Handle login logic here
    res.send('login');
  } catch (err) {
    next(err);
  }
});

router('/logout', async (req, res, next) => {
  try {
    // Handle logout logic here
    res.send('logout');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
