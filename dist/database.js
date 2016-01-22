'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = database;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _configDBandServer = require('./configDBandServer');

var my = _interopRequireWildcard(_configDBandServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function database() {
  function toUpper(value) {
    return value.toUpperCase();
  }
  function validator(value) {
    return !isNaN(value);
  };
  var check = [validator, 'You did not enter a number for that stat'];
  var db = undefined;
  var PlayerStatsSchema = undefined;
  var dbData = {
    start: function start(callback) {
      _mongoose2.default.connect('' + my.dbConnect + my.dbName);
      db = _mongoose2.default.connection;
      db.on('error', function (error) {
        console.log(error);
        db.close();
      });
      db.once('open', callback);
    },

    mongoose: _mongoose2.default,
    db: db,
    createSchema: function createSchema() {
      var Schema = _mongoose2.default.Schema;
      PlayerStatsSchema = new Schema({
        name: { type: String, unique: true, required: true, set: toUpper },
        team: { type: String, required: true, set: toUpper },
        age: { type: Number, required: true, validate: check },
        height: {
          feet: { type: Number, validate: check },
          inches: { type: Number, validate: check }
        },
        position: { type: String, required: true, set: toUpper },
        rookie: Boolean,
        numberOfGamesPlayed: { type: Number, required: true, validate: check },
        totals: {
          points: { type: Number, validate: check },
          rebounds: { type: Number, validate: check },
          assists: { type: Number, validate: check },
          steals: { type: Number, validate: check },
          blocks: { type: Number, validate: check }
        },
        average: {
          pointsPerGame: { type: Number, validate: check },
          reboundsPerGame: { type: Number, validate: check },
          assistsPerGame: { type: Number, validate: check },
          stealsPerGame: { type: Number, validate: check },
          blocksPerGame: { type: Number, validate: check }
        }
      });
      var player = _mongoose2.default.model('Player', PlayerStatsSchema);
      return player;
    }
  };
  return dbData;
}