const router = require('express').Router();
const formController = require('../controllers/formController');

// Запрос, который возвращает форму с разделами и полями
router.post('/form_data', formController.getFormData);

module.exports = router;
