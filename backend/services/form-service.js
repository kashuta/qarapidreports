const {
  Form, FormSection, FormField, FormResponse, FormResponseAnswer,
} = require('../db/models');
const { backendErrors } = require('../exceptions');

class FormService {
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
  }

  async getAllFormNames() {
    try {
      const formNames = await Form.findAll();
      return formNames;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async saveFormData(userId, formId, status, formData) {
    try {
      const created = await FormResponse.create({
        formId, inspectorId: userId, status,
      });
      if (!created) {
        throw new Error(backendErrors.DATABASE_ERROR);
      }
      const createdAnswer = await FormResponseAnswer.create({
        formResponseId: created.dataValues.id,
        answer: formData,
      });
      if (!createdAnswer) {
        throw new Error(backendErrors.DATABASE_ERROR);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new FormService();
