const router = require('express').Router();

/**
 * @swagger
 * /signup:
 *   get:
 *     summary: Signup route
 *     description: Retrieve signup information
 *     tags:
 *       - Signup
 *     responses:
 *       200:
 *         description: Successful signup response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: signup
 *       500:
 *         description: Internal server error
 */
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

module.exports = router;
