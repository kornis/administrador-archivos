'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id:{
      type:  DataTypes.BIGINT,
      primaryKey: true,
    },
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    categoryId: DataTypes.BIGINT
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });
  };
  return File;
};