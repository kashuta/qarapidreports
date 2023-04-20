const router = require('express').Router();
const multerMiddleware = require('../middlewares/multer.middleware');
const formController = require('../controllers/formController');

// Запрос, который возвращает форму с разделами и полями
router.get('/form_data/:formId', formController.getFormData);
// Запрос, который возвращает все имена форм
router.get('/form_names', formController.getAllFormNames);

// Запрос, который сохраняет данные в форм
router.post('/form_save_data', multerMiddleware.any('file'), formController.saveFormData);
// Запрос на имена инспекторов
router.get('/inspectors_names_data', formController.inspectorsNamesData);

// Запрос, который возвращает данные в форм
router.post('/get_form_data', formController.getFormData);

// Запрос, который возвращает данные в форм
router.post('/form_data_for_dashboard', formController.formDataForDashboard);

router.post('/get_all_data_for_one_inspector', formController.getAllDataForOneInspector);

router.post('/get_by_date_data_for_one_inspector', formController.getByDateDataForOneInspector);

router.post('/get_inspector_stat', formController.getInspectorStat);

router.post('/get_hse_form_params', formController.getHseFormParams);

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
