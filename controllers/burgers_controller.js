// Controller code acts as a liaison between the Model and the View, 
// receiving user input and deciding what to do with it. It’s the brains of the application

// Dependencies 
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// Create all our get, put, and post routes and set up logic within those routes where required. 

router.get('/', function (req, res) {
  //The root will show all the burgers
  burger.selectAll(function(data) {
    console.log('the data');
    //Store the data we receive as an object to our index 
    // testing connection
    // res.json({
    // message: 'hello world'
    let hbsObject = {
      burgers: data
    };
    // // Display content on the page
    console.log(hbsObject);
    res.render('index', hbsObject);
    }); 
  });

// Puts and Delete reques are similarly constructed
router.put('/api/burgers/:id', function (req, res) {
  let condition = 'id = ' + req.params.id;
  console.log('condition', condition);

  burger.updateOne({
    'devoured': req.body.devoured},
    condition, function(result) {
      if (result.changeRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
  });
});

// Post request that adds a new burger with a create method
// api/burger has to be the same as burgers: data
router.post('/api/burgers', function (req, res) {

  const burgerName = req.body.burger_name;

  burger.insertOne(
    ['burger_name', 'devoured'], [burgerName, req.body.devoured],
    function (error, result) {
      if (error) {
        return res.status(401).json({
          message: 'Not able to a'
        })
      }
      // Send back the ID of the new burger
      res.json({
        burger_name: burgerName,
        id: result.insertId});
    });
});

// Deletes the burger 
router.delete('api/burgers/:id', function(req, res) {
  let condition = 'id = ' + req.params.id; 
  console.log('condition', condition); 

  burger.deleteOne(condition, function(result) {
    if (result.changeRows === 0) {
      return res.status(404).end(); 
    } else {
      res.status(200).end(); 
    }
  }); 
}); 

// Eport routes for server.js to use
module.exports = router; 
