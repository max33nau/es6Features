'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _configDBandServer = require('./configDBandServer');

var my = _interopRequireWildcard(_configDBandServer);

var _database = require('./database');

var _stats = require('./stats');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var dbData = (0, _database.database)();

app.use('/player', (0, _stats.stats)());

var server = app.listen(process.env.PORT || my.serverPort, function () {
  console.log('server is connected');
  dbData.start(function () {
    console.log('connected to database');
  });
});