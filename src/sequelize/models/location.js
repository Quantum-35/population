'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    females: DataTypes.STRING,
    male: DataTypes.STRING,
    under18: DataTypes.STRING,
    over18: DataTypes.STRING,
    totalResidents: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};