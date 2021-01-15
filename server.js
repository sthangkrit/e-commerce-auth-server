var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var port = process.env.port || 3000;

app.use('/', require('./router/index'));

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});

