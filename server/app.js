var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/hero');

var ourSchema = new mongoose.Schema({
  alias: String,
  first_name: String,
  last_name: String,
  city: String,
  power_name: String
});//End of ourSchema

var ourHeroes = mongoose.model('ourHeroes', ourSchema);

app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'));
});//End of app get base url

app.get('/getHeroes', function (req, res) {
  ourHeroes.find()
  .then(function (data) {
    res.send(data);
  });
});//End of get pets

app.post('/heroPost', function (req, res) {
  var heroToAdd = {
    alias: req.body.alias,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    power_name: req.body.power_name
  };
  var newHero = ourHeroes(heroToAdd);
  newHero.save();
});

app.delete('/deleteHeroes', function (req, res) {
  console.log('delete route');
});//End of delete heroes

//spin up server
app.listen(4242, 'localhost', function (req, res) {
  console.log('listening on 4242 the Ultimate answer to everything 42');
});//End of app listen on 4242

//static folder
app.use(express.static('public'));
