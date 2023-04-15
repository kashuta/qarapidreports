const router = require('express').Router();
const formController = require('../controllers/formController');

// Запрос, который возвращает форму с разделами и полями
router.get('/form_data/:formId', formController.getFormData);
// Запрос, который возвращает все имена форм
router.get('/form_names', formController.getAllFormNames);

module.exports = router;
