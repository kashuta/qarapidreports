const { Op } = require('sequelize');
const {
  Form,
  FormSection,
  FormField,
  FormResponse,
  FormResponseAnswer,
  Users
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
        formId: form.id,
        columnNames: formSections.map((el) => ({
          title: el.title,
          order: el.order
        })),
        questionFields: formFields.map((el) => ({
          question: el.label,
          type: el.type,
          order: el.order
        }))
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
        formId,
        inspectorId: userId,
        status
      });
      if (!created) {
        throw new Error(backendErrors.DATABASE_ERROR);
      }
      const createdAnswer = await FormResponseAnswer.create({
        formResponseId: created.dataValues.id,
        answer: formData
      });
      if (!createdAnswer) {
        throw new Error(backendErrors.DATABASE_ERROR);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllInspectorsNames() {
    try {
      const inspectorsNames = await Users.findAll({ where: { roleId: 3 } });
      return inspectorsNames;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getFormDataForPeriod(data) {
    const { from, to } = data;
    // const startDate = new Date(from.setHours(0, 0, 0, 0));
    // console.log(startDate, '000000');
    // const endDate = new Date(to.setHours(23, 59, 59, 999));
    try {
      const result = await FormResponse.findAll({
        where: {
          createdAt: {
            [Op.between]: [from, to]
          }
        }
      });
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new FormService();
