var Promise = require('bluebird');
var models = require('../models');
var mysql    = Promise.promisifyAll(require('mysql'));
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat',
  debug: false
});



module.exports = {
  messages: {
    get: function (req, res) {
      var connectionPromise = pool.getConnectionAsync();

      connectionPromise
      .then(function(connection) {
        // console.log('connected as id:', connection.threadId);
        return connection.queryAsync('SELECT * FROM messages')
        .then(function(rows) {
          res.json(rows[0]);
        })
      })
      .catch(function(e) {
        res.json({code: 100, status: 'Error in connection database'});
      })
      .finally(function () {
        var connection = connectionPromise.value();
        if (connection) {
          connection.release();
        }
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      var connectionPromise = pool.getConnectionAsync();

      connectionPromise
      .then(function(connection) {
        return connection.queryAsync('INSERT INTO messages SET ?', req.body);
      })
      .then(function(result) {
        res.status(200).send(result)
      })
      .catch(function(e, connection) {
        res.json({code: 100, status: 'Error in connection database'});
      })
      .finally(function () {
        var connection = connectionPromise.value();
        if (connection) {
          connection.release();
        }
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.send(200);
    },
    post: function (req, res) {
      res.send(200);
    }
  }
};

