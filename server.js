"use strict";

var express 	= require('express'),
bodyParser  = require('body-parser'),
http        = require('http'),
path        = require('path'),
serveStatic = require('serve-static'),
_ = require('lodash'),
ID = 0,
BP = require('./data.js').data;

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3001);
app.use(serveStatic(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
}),

// JSON API
app.get('/server/api/bp', function (req, res) {
  return res.status(200).json(BP);

});

app.get('/server/api/bp/:id', function (req, res){
  var id = req.params.id;

  var bp = _.find(BP, function (bp) {
    return bp.id == id;
  });

  if (bp) {
    return res.status(200).json(bp);
  } else {
    return res.status(404).end();
  }
});

app.post('/server/api/bp', function (req, res) {
  var bp = req.body;
  ID ++;
  movieToAdd.id = ID;
  BP.push(bp);
  return res.status(201).json(bp);
});

app.put('/server/api/bp/:id', function(req, res) {
  var ubp = req.body;

  _.forEach(BP, function (bp, index) {
    if (bp.id == ubp.id) {
      BP[index] = ubp;
      return res.status(200).end();
    }
  });

  return res.status(304).end();
});

app.delete('/server/api/bp/:id', function (req, res) {
  var id = req.params.id;

  var removed = _.remove(BP, function (bp) {
    return bp.id == id;
  });

  if (_.isEmpty(removed)) {
    return res.status(304).end();
  } else {
    return res.status(200).end();
  }

});


server.listen(app.get('port'), function() {
  console.log('Express server listening on http://localhost:%d/', app.get('port'));
});
