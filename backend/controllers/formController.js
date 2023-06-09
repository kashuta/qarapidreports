const formService = require('../services/form-service');
const { ErrorHandler, backendErrors } = require('../exceptions/index');

class FormController {
  async getFormData(req, res, next) {
    try {
      const { formId } = req.params;
      if (!formId) {
        return next(ErrorHandler.BadRequestError(backendErrors.VALIDATION_ERROR, res));
      }
      const responseObject = await formService.getFormData(formId);
      return res.json(responseObject);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getAllFormNames(req, res, next) {
    try {
      const responseObject = await formService.getAllFormNames();
      return res.json(responseObject);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async saveFormData(req, res, next) {
    try {
      const {
        formId, status, formData, userId,
      } = req.body;
      if (!formId || !status || !formData || !userId) {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.INCORRECT_DATA_ERROR, res));
      }
      await formService.saveFormData(userId, formId, status, formData);
      return res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async formDataForDashboard(req, res, next) {
    try {
      const { date } = req.body;
      const obj = await formService.formDataForDashboard(date);
      res.status(200).json({ ...obj });
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getFormDataForInspectorDashboard(req, res, next) {
    try {
      const { email } = req.body;
      const responseObject = await formService.getFormDataForInspectorDashboard(email);
      res.status(200).json(responseObject);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
    // {
    // allreports - все отчеты по юзеру
    // отдельная ручка для сортировки по дате
    //  имя формы: количество
    // все локации
    // }
  }

  async inspectorsNamesData(req, res, next) {
    try {
      const responseObject = await formService.getAllInspectorsNames();
      const locations = responseObject.map((el) => el.name);
      return res.json(locations);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }
}

module.exports = new FormController();
