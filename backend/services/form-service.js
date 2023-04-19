/* eslint-disable no-unused-vars */
const moment = require('moment');
const Sequelize = require('sequelize');
const {
  Form, FormSection, FormField, FormResponse, FormResponseAnswer,
  Users, Locations,
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
        formId,
        inspectorId: userId,
        status,
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
          attributes: ['id', 'isSafe'],
          include: [{ model: Form, attributes: ['name'] }],
        }],
        attributes: ['userName'],
      });
      const objectUserFormName = qwer.map((el) => el.get({ plain: true })).map((el) => ({ userName: el.userName, FormName: el.FormResponses.map((el1) => el1.Form.name), isSafe: el.FormResponses.map((el1) => el1.isSafe) }));
      const allInspectorNames = objectUserFormName.map((el) => el.userName);
      const allReportCount = objectUserFormName.reduce((prev, curr) => prev + curr.FormName.length, 0);
      const info = objectUserFormName.map((el) => ({
        inspectorName: el.userName,
        allReportCountUser: el.FormName.length,
        reports: el.FormName.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {}),
      }));
      const allReportFormCount = objectUserFormName.reduce((acc, curr) => {
        curr.FormName.forEach((name) => {
          acc[name] = (acc[name] || 0) + 1;
        });
        return acc;
      }, {});
      const isSafe = objectUserFormName.reduce((acc, item) => {
        const countTrue = item.isSafe.filter((i) => i === true).length;
        const countFalse = item.isSafe.filter((i) => i === false).length;
        return {
          true: acc.true + countTrue,
          false: acc.false + countFalse,
        };
      }, { true: 0, false: 0 });
      return {
        allInspectorNames, allReportCount, allReportFormCount, isSafe, info,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllInspectorsNames() {
    try {
      const inspectorsNames = await Users.findAll({ where: { roleId: 3 } });
      const ret = inspectorsNames.map((el) => ({ userName: el.userName, email: el.email }));
      return ret;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllLocations() {
    try {
      const locations = await Locations.findAll();
      return locations;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new FormService();
