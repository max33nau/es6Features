'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = stats;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _database = require('./database');

var _player_handler = require('./player_handler');

var playerHandler = _interopRequireWildcard(_player_handler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const dbData = database();
// const Player = dbData.createSchema();
var router = _express2.default.Router();

function stats() {
  router.use(_bodyParser2.default.json());
  router.use(_bodyParser2.default.urlencoded({ extended: false }));
  router.get('/', playerHandler.getAll);
  router.get('/:id', playerHandler.getPlayerById);
  router.post('/', playerHandler.createPlayer);
  router.patch('/:id', playerHandler.updatePlayerInfo);
  router.delete('/:id', playerHandler.removePlayer);
  return router;
}