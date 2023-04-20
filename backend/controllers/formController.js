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
      const { formId, status, formData, userId } = req.body;
      if (!formId || !status || !formData || !userId) {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.INCORRECT_DATA_ERROR, res));
      }
      const answer = JSON.parse(formData);
      await formService.saveFormData(userId, formId, status, answer);
      return res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
      console.log(err);
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async formDataForDashboard(req, res, next) {
    try {
      const { data } = req.body;
      const obj = await formService.formDataForDashboard(data);
      res.status(200).json({ ...obj });
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async inspectorsNamesData(req, res, next) {
    try {
      const responseObject = await formService.getAllInspectorsNames();
      return res.json(responseObject);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getAllDataForOneInspector(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const responseObject = await formService.getAllDataForOneInspector(refreshToken);
      res.status(200).json({ responseObject });
    } catch (err) {
      console.log(err);
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getByDateDataForOneInspector(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { data } = req.body;
      if (!data) {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.INCORRECT_DATA_ERROR, res));
      }

      const responseObject = await formService.getByDateDataForOneInspector(refreshToken, data);
      res.status(200).json({ responseObject });
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getInspectorStat(req, res, next) {
    try {
      const { email, data, location } = req.body;
      if (!data) {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.INCORRECT_DATA_ERROR, res));
      }
      if (!email || !location) {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.INCORRECT_DATA_ERROR, res));
      }
      const responseObject = await formService.getInspectorStat(email, data, location);
      console.log({ ...responseObject });
      res.status(200).json({ responseObject });
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async getHseFormParams(req, res, next) {
    try {
      const { data } = req.body;
      const responseObject = await formService.getHseFormParams(data);
      console.log(responseObject);
      return res.json(responseObject);
    } catch (err) {
      throw next(ErrorHandler.BadRequestError(err, res));
    }
  }
}

module.exports = new FormController();
