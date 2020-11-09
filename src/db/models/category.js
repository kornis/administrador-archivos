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
    // associations can be defined here
    /*Category.belongsTo(models.Permission, {
      foreignKey: "id"
    });*/

    Category.hasMany(models.File, {
      foreignKey: "categoryId"
    })
  };
  return Category;
};