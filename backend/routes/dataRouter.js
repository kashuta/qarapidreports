const router = require('express').Router();
const multerMiddleware = require('../middlewares/multer.middleware');

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

// set form/data route
router.post('/form');
router.post('/upload', multerMiddleware.single('avatar'), async (req, res) => {
  try {
    console.log(req.file, '+++++++++req.file++++++++++++');
    if (req.file) {
      // const imageUrl = `http://localhost:3001/public/img/${req.file.filename}`;
      res.json(req.file);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
