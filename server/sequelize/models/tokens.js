'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokens.init(
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expired:{
        type:DataTypes.BOOLEAN,
        allowNull:false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: "tokens",
    }
  );
  return tokens;
};