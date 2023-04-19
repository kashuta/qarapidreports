const router = require('express').Router();
const multerMiddleware = require('../middlewares/multer.middleware');
const formController = require('../controllers/formController');

// Запрос, который возвращает форму с разделами и полями
router.get('/form_data/:formId', formController.getFormData);
// Запрос, который возвращает все имена форм
router.get('/form_names', formController.getAllFormNames);

// Запрос, который сохраняет данные в форм
router.post('/form_save_data', multerMiddleware.any('file'), formController.saveFormData);

// Запрос, который сохраняет фотографию
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
