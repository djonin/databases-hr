var Promise = require('bluebird');
var db = require('../db/index.js');

module.exports = {
  messages: {
    get: function (req, res) {
      db.Messages.findAll()
      .then(function(messages) {
        res.json(messages);
      })
      .catch(function() {
        res.json({code: 100, status: 'Error in connection to database'});
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      db.Messages.create(req.body)
      .then(function() {
        res.send(200);
      })
      .catch(function() {
        res.json({code: 100, status: 'Error in connection to database'});
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.Users.findAll()
      .then(function(users) {
        res.json(users);
      })
      .catch(function() {
        res.json({code: 100, status: 'Error in connection to database'});
      });
    },
    post: function (req, res) {
      db.Users.create(req.body)
      .then(function() {
        res.send(200);
      })
      .catch(function() {
        res.json({code: 100, status: 'Error in connection to database'});
      });
    }
  }
};

