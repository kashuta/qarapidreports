const router = require('express').Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

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

// auth route
router.post(
  '/registration',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  userController.registration,
);
router.post('/login', userController.login);
router.get('/activate/:link', userController.activate);
// router.post('/logout', userController.logout);
// router.get('/refresh', userController.refresh);

module.exports = router;
