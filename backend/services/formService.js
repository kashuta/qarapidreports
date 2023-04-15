const { Form, FormSection, FormField } = require('../db/models');
const { backendErrors } = require('../exceptions');

module.exports = {
  async getFormData(formId) {
    try {
      const form = await Form.findOne({
        where: { id: formId },
        include: [
          {
            model: FormSection,
            as: 'FormSections',
            order: [['order', 'ASC']],
            include: [
              {
                model: FormField,
                as: 'FormFields',
                order: [['order', 'ASC']],
              },
            ],
          },
        ],
      });
      if (!form) {
        throw new Error(backendErrors.FORM_NOT_FOUND.message);
      }

      const responseObject = {
        formName: form.name,
        sections: form.FormSections.map((section) => ({
          sectionName: section.title,
          order: section.order,
          fields: section.FormFields.map((field) => ({
            id: field.id,
            formId: field.formId,
            label: field.label,
            type: field.type,
            order: field.order,
          })),
        })),
      };
      if (!responseObject) {
        throw new Error(backendErrors.FORM_NOT_FOUND.message);
      }

      return responseObject;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
