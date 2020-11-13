'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id:{
      type:  DataTypes.BIGINT,
      primaryKey: true
    },
    title: DataTypes.STRING,
    permission: DataTypes.STRING
  }, {});
  
  Category.associate = function(models) {
    Category.hasMany(models.File, {
      foreignKey: "categoryId"
    })
  };
  return Category;
};