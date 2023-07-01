const moment = require('moment');
const Sequelize = require('sequelize');
const {
  Form,
  FormSection,
  FormField,
  FormResponse,
  FormResponseAnswer,
  Users,
  RefreshToken
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

  async safe(data) {
    const qwer = await Users.findAll({
      where: { roleId: 3 },
      include: [
        {
          model: FormResponse,
          where: {
            createdAt: {
              [Sequelize.Op.between]: [data.from, data.to]
            }
          },
          attributes: ['id', 'isSafe'],
          include: [
            {
              model: FormResponseAnswer,
              attributes: ['answer']
            },
            { model: Form, where: { name: 'HSE OBSERVATION (STOP) CARD' }, attributes: ['name'] }
          ]
        }
      ],
      attributes: ['userName']
    });
    const countByFormAndIsSafe = [];
    let i = 0;
    // Проходим по каждому элементу массива
    qwer.forEach((element) => {
      // Проходим по каждому FormResponse внутри элемента
      element.FormResponses.forEach((formResponse) => {
        // Получаем название формы и значение isSafe
        const formName = formResponse.Form.name;
        const { isSafe } = formResponse;

        // Проверяем, что форма является 'HSE OBSERVATION (STOP) CARD'
        if (formName === 'HSE OBSERVATION (STOP) CARD') {
          i++;
          // Если элемент с данным названием формы и значением isSafe уже есть в объекте, увеличиваем его счетчик
          if (countByFormAndIsSafe[formName] && countByFormAndIsSafe[formName][isSafe]) {
            countByFormAndIsSafe[formName][isSafe]++;
          } else {
            countByFormAndIsSafe.push({ [isSafe]: 1 });
          }
        }
      });
    });
    const result = countByFormAndIsSafe.reduce((acc, obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});
    return { hseForm: { count: i, ...result } };
  }

  async formDataForDashboard(data) {
    try {
      if (!data || !data.from || !data.to || !moment(data.from).isBefore(data.to)) {
        // проверка, что дата data.from находится до data.to (с учетом указанной единицы измерения);
        throw new Error(backendErrors.INCORRECT_DATA_ERROR);
      }
      const qwer = await Users.findAll({
        where: { roleId: 3 },
        include: [
          {
            model: FormResponse,
            where: {
              createdAt: {
                [Sequelize.Op.between]: [data.from, data.to]
              }
            },
            attributes: ['id', 'isSafe'],
            include: [{ model: Form, attributes: ['name'] }]
          }
        ],
        attributes: ['userName']
      });
      const objectUserFormName = qwer
        .map((el) => el.get({ plain: true }))
        .map((el) => ({
          userName: el.userName,
          FormName: el.FormResponses.map((el1) => el1.Form.name),
          isSafe: el.FormResponses.map((el1) => el1.isSafe)
        }));
      const allInspectorNames = objectUserFormName.map((el) => el.userName);
      const allReportCount = objectUserFormName.reduce(
        (prev, curr) => prev + curr.FormName.length,
        0
      );
      const info = objectUserFormName.map((el) => ({
        inspectorName: el.userName,
        allReportCountUser: el.FormName.length,
        reports: el.FormName.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {})
      }));
      const allReportFormCount = objectUserFormName.reduce((acc, curr) => {
        curr.FormName.forEach((name) => {
          acc[name] = (acc[name] || 0) + 1;
        });
        return acc;
      }, {});
      const hseForm = await this.safe(data);
      return {
        allInspectorNames,
        allReportCount,
        allReportFormCount,
        ...hseForm,
        info
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

  async getByDateDataForOneInspector(refresh, data) {
    try {
      const valid = await RefreshToken.findOne({ where: { token: refresh }, raw: true });
      const response = await Users.findOne({
        where: { id: valid.userId },
        attributes: [],
        include: [
          {
            model: FormResponse,
            attributes: ['formId'],
            where: {
              createdAt: {
                [Sequelize.Op.between]: [data.from, data.to]
              }
            },
            include: [
              {
                model: Form,
                attributes: ['name']
              },
              {
                model: FormResponseAnswer,
                attributes: ['answer', 'createdAt']
              }
            ]
          }
        ]
      });
      console.log(response);
      if (response === null) {
        return null;
      }
      // console.dir('@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', response.get({ plain: true }), {
      //   depth: null
      // });
      const obj = response
        .get({ plain: true })
        .FormResponses.map((el) => ({
          name: el.Form.name,
          answer: el.FormResponseAnswers[0].answer,
          createdAt: el.FormResponseAnswers[0].createdAt
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return obj;
      // return {};
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  async getInspectorStat(email, data) {
    try {
      const obj = await Users.findOne({
        where: { email },
        attributes: ['userName'],
        include: [
          {
            model: FormResponse,
            attributes: ['formId'],
            where: {
              createdAt: {
                [Sequelize.Op.between]: [data.from, data.to]
              }
            },
            include: [
              {
                model: Form,
                attributes: ['name']
              },
              {
                model: FormResponseAnswer,
                attributes: ['answer']
              }
            ]
          }
        ]
      });
      if (obj === null) {
        return {};
      }
      const responseObject = obj.get({ plain: true }).FormResponses.map((el) => ({
        formName: el.Form.name,
        answer: el.FormResponseAnswers[0].answer,
        location: el.FormResponseAnswers[0].answer.location,
        date: el.FormResponseAnswers[0].answer.date
      }));
      const countMap = responseObject.reduce((acc, cur) => {
        const { formName } = cur;
        if (!acc[formName]) {
          acc[formName] = 1;
        } else {
          acc[formName]++;
        }
        return acc;
      }, {});
      let totalForms = 0;
      for (const formName in countMap) {
        totalForms += countMap[formName];
      }
      return { responseObject, countMap, total: totalForms };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async getHseFormParams(data) {
    try {
      const obj = await FormResponse.findAll({
        where: { formId: 4, createdAt: { [Sequelize.Op.between]: [data.from, data.to] } },
        attributes: ['isSafe'],
        include: [
          {
            model: FormResponseAnswer,
            attributes: ['answer']
          }
        ]
      });
      const responseObject = obj
        .map((el) => el.get({ plain: true }))
        .map((el1) => ({
          healthHazard: el1.FormResponseAnswers[0].answer.healthHazard,
          unsafeCondition: el1.FormResponseAnswers[0].answer.unsafeCondition,
          environmentalRisk: el1.FormResponseAnswers[0].answer.environmentalRisk
        }));
      const counts = responseObject.reduce(
        (acc, curr) => {
          acc.healthHazard += curr.healthHazard ? 1 : 0;
          acc.unsafeCondition += curr.unsafeCondition ? 1 : 0;
          acc.environmentalRisk += curr.environmentalRisk ? 1 : 0;
          return acc;
        },
        { healthHazard: 0, unsafeCondition: 0, environmentalRisk: 0 }
      );
      return { ...counts };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}

module.exports = new FormService();
