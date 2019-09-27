
// Import orm from config into burger to be used by the file 
const orm = require('../config/orm.js');

// Call the ORM function using burger specific input for the ORM
const burger = {
  selectAll: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
    });
  },

  // The variables cols and vals are arrays
  insertOne: function(col, vals, cb) {
    orm.insertOne('burgers', col, vals, function(res) {
      cb(res);
    });
  },

  // Changes devoured to true
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, function(res) {
      cb(res);
    });
  }, 

  // Removes a burger
  deleteOne: function(condition, cb) {
    orm.deleteOne('burgers', condition, function(res) {
      cb(res); 
    }); 
  }
}; 

// Export the database function for the controller (burgerController.js)
module.exports = burger;
