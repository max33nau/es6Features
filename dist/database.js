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
        name: { type: String, unique: true, required: true },
        team: { type: String, required: true },
        age: { type: Number, required: true },
        height: {
          feet: Number,
          inches: Number
        },
        position: { type: String, required: true },
        rookie: Boolean,
        numberOfGamesPlayed: Number,
        totals: {
          points: Number,
          rebounds: Number,
          assists: Number,
          steals: Number,
          blocks: Number
        },
        average: {
          pointsPerGame: Number,
          reboundsPerGame: Number,
          assistsPerGame: Number,
          stealsPerGame: Number,
          blocksPerGame: Number
        }
      });
      var player = _mongoose2.default.model('Player', PlayerStatsSchema);
      return player;
    }
  };
  return dbData;
}