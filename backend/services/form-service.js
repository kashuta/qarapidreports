/* eslint-disable no-unused-vars */
const moment = require('moment');
const Sequelize = require('sequelize');
const {
  Form, FormSection, FormField, FormResponse, FormResponseAnswer,
  Users,
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

  async formDataForDashboard(date) {
    try {
      if (!date || !date.from || !date.to || !moment(date.from).isBefore(date.to)) {
        // проверка, что дата date.from находится до date.to (с учетом указанной единицы измерения);
        throw new Error(backendErrors.INCORRECT_DATA_ERROR);
      }
      const allFormNames = await this.getAllFormNames();
      const qwer = await Users.findAll({
        where: { roleId: 3 },
        include: [{
          model: FormResponse,
          where: {
            createdAt: {
              [Sequelize.Op.between]: [date.from, date.to],
            },
          },
          attributes: ['id'],
          include: [{ model: Form, attributes: ['name'] }],
        }],
        attributes: ['userName'],
      });
      const r = qwer.map((el) => el.get({ plain: true })).map((el) => ({ userName: el.userName, FormName: el.FormResponses.map((el1) => el1.Form.name) }));
      const allInspectorNames = r.map((el) => el.userName);
      const allReportCount = r.reduce((prev, curr) => prev + curr.FormName.length, 0);
      const info = r.map((el) => ({
        inspectorName: el.userName,
        allReportCountUser: el.FormName.length,
        reports: el.FormName.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {}),
      }));
      return { allInspectorNames, allReportCount, info };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new FormService();
