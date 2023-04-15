const router = require('express').Router();
const multerMiddleware = require('../middlewares/multer.middleware');

// set form/data route
router.post('/form');
router.post('/upload', multerMiddleware.single('avatar'), async (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
