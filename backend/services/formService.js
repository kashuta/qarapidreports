const { Form, FormSection, FormField } = require('../db/models');
const { backendErrors } = require('../exceptions');

module.exports = {
  async getFormData(formId) {
    try {
      const formIdInt = parseInt(formId, 10);
      const form = await Form.findOne({ where: { id: formIdInt } });
      const formSections = await FormSection.findAll({ where: { formId: formIdInt } });
      const formFields = await FormField.findAll({ where: { formId: formIdInt } });

      if (!form || !formSections || !formFields) {
        throw new Error(backendErrors.FORM_NOT_FOUND.message);
      }

      const responseObject = {
        formName: form.name,
        columnNames: formSections.map((el) => ({
          title: el.title,
          order: el.order,
        })),
        questionFields: formFields.map((el) => ({
          question: el.label,
          type: el.type,
          order: el.order,
        })),
      };

      return responseObject;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
