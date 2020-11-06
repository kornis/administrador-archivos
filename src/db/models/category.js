'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Permission, {
      foreignKey: "id"
    })
  };
  return Category;
};