const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      readOnly: true,
      description: 'уникальный идентификатор',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'электронная почта',
    },
    password: {
      type: 'string',
      description: 'хэшированный пароль',
    },
    role: {
      type: 'string',
      enum: ['admin', 'manager', 'inspector'],
      description: 'роль пользователя',
    },
    confirmed: {
      type: 'boolean',
      description: 'булево значение, указывающее на подтверждение учетной записи',
    },
    manager_id: {
      type: 'integer',
      format: 'int64',
      nullable: true,
      description: 'внешний ключ, ссылка на менеджера, который подтвердил инспектора',
    },
  },
};

module.exports = {
  userSchema,
};
