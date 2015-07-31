var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');

sequelize.Messages = sequelize.define('messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')}
});

sequelize.Users = sequelize.define('users', {
  username: Sequelize.STRING,
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  settings: Sequelize.TEXT
});

sequelize.Messages.sync();
sequelize.Users.sync();

module.exports = sequelize;
