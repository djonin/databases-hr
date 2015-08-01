var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');



sequelize.Messages = sequelize.define('messages', {
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
}, {
  indexes: [{
    fields: ['createdAt']
  }]
}
);

sequelize.Users = sequelize.define('users', {
  username: Sequelize.STRING,
  userid: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
  settings: Sequelize.TEXT
});

sequelize.Users.hasMany(sequelize.Messages, {
  foreignKey: {
    name: 'userid',
    allowNull: true,
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

sequelize.Users.sync()
.then(function() {
  return sequelize.Messages.sync();
});

module.exports = sequelize;
