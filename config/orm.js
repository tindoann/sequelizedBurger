// Used from problemset 

// Import MySQL connection 
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?'); 
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    arr.push(key + '=' + ob[key]);
  }

  // Seperates an array of strings with commas
  return arr.toString();
}
// Object Relational Mapper (ORM)

let orm = {
  // Shows all the burgers
  selectAll: function(tableInput, cb) {
    console.log('I am not getting here')
    let queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(err, result) {
      console.log('what up brah')
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // Adds a burger
  insertOne: function (table, cols, vals, cb) {
    let queryString = 'INSERT INTO ' + table;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // Update devoured to true
  updateOne: function (table, objColVals, devoured, cb) {
    let queryString = 'UPDATE ' + table; 

    queryString += ' SET '; 
    queryString += objToSql(objColVals); 
    queryString += ' WHERE '; 
    queryString += devoured; 

    console.log(queryString); 

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err; 
      }
      cb(result); 
    }); 
  },

  // Removes a burger from the browser
  deleteOne: function(table, devoured, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += devoured;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
        if (err) {
          throw err
        }
        cb(result);
    });
  }
}; 

// Export the ORM 
module.exports = orm; 