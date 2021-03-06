'use strict';
module.exports = (sequelize, DataTypes) => {
  const entry = sequelize.define('entry', {
    feeling: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  entry.associate = function(models) {
    // associations can be defined here
    models.entry.belongsTo(models.user)
  };
  return entry;
};