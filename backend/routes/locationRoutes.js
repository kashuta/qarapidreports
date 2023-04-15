const router = require('express').Router();
const multerMiddleware = require('../middlewares/multer.middleware');
const locationController = require('../controllers/locationController');

// set form/data route
router.get('/getLocation', locationController.getLocation);
router.post('/addLocation', locationController.addLocation);
router.delete('/deleteLocation', locationController.deleteLocation);
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
