const router = require('express').Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

router.post(
  '/registration',
  body('email').isEmail().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('userName').isLength({ min: 2 }).withMessage('User name is required'),
  userController.registration,
);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);

router.get('/refresh', userController.refresh);

module.exports = router;
