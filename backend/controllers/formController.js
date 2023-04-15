const formService = require('../services/formService');
const { ErrorHandler, backendErrors } = require('../exceptions/index');

module.exports = {
  async getFormData(req, res, next) {
    try {
      const { formId } = req.body;
      if (!formId) {
        return next(ErrorHandler.BadRequestError(backendErrors.VALIDATION_ERROR, res));
      }
      const responseObject = await formService.getFormData(formId);
      return res.json(responseObject);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err));
    }
  },
};