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

// set form/data route
router.post(
  '/form',
);

module.exports = router;
