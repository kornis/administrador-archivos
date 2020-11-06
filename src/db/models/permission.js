'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    typeUser: {
      type: DataTypes.ENUM,
      values: ["teacher","student","parent"]
    }
  }, {});
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};