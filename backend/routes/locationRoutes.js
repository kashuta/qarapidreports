const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/getLocation', locationController.getLocation);
router.post('/addLocation', locationController.addLocation);
router.delete('/deleteLocation', locationController.deleteLocation);

module.exports = router;
