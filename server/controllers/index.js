var Promise = require('bluebird');
var models = require('../models');
var mysql    = Promise.promisifyAll(require('mysql'));

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: chat,
  debug: false
});


module.exports = {
  messages: {
    get: function (req, res) {
      pool.getConnectionAsync()
      .then(function(connection) {
        console.log('connected as id:', connection.threadId);
        return connection.queryAsync('SELECT * FROM messages');
      })
      .then(function(rows) {
        res.json(rows);
      })
      .catch(function(e, connection)) {
        connection.release();
        res.json({code: 100, status: 'Error in connection database'});
      }
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      pool.getConnectionAsync()
      .then(function(connection) {
        var obj = req.body;
        console.log('obj:', obj);
        return connection.queryAsync('INSERT INTO messages SET ?', obj);
      })
      .then(function(result) {
        res.send(200, result);
      })
      .catch(function(e, connection)) {
        connection.release();
        res.json({code: 100, status: 'Error in connection database'});
      }

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

