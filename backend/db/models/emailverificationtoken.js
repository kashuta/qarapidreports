const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmailVerificationToken extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  EmailVerificationToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      token: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'EmailVerificationToken',
    }
  );
  return EmailVerificationToken;
};
