const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('authentication_server', 'root', 'A#1234Esther', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
