const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmailVerificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  EmailVerificationToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'EmailVerificationToken',
  });
  return EmailVerificationToken;
};
