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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbData = (0, _database.database)();
var Player = dbData.createSchema();
var router = _express2.default.Router();

function stats() {
  router.use(_bodyParser2.default.json());
  router.use(_bodyParser2.default.urlencoded({ extended: false }));

  router.post('/', function (request, response) {
    var newPlayer = new Player();
    var gamesPlayed = Number(request.body.numberOfGamesPlayed);
    newPlayer.name = request.body.name;
    newPlayer.team = request.body.team;
    newPlayer.age = Number(request.body.age);
    newPlayer.height.feet = Number(request.body.feet);
    newPlayer.height.inches = Number(request.body.inches);
    newPlayer.position = request.body.position;
    newPlayer.rookie = request.body.rookie;
    newPlayer.numberOfGamesPlayed = gamesPlayed;
    newPlayer.totals.points = Number(request.body.totalPoints);
    newPlayer.totals.rebounds = Number(request.body.totalRebounds);
    newPlayer.totals.assists = Number(request.body.totalAssists);
    newPlayer.totals.steals = Number(request.body.totalSteals);
    newPlayer.totals.blocks = Number(request.body.totalBlocks);
    newPlayer.average.pointsPerGame = Number((newPlayer.totals.points / gamesPlayed).toFixed(1));
    newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds / gamesPlayed).toFixed(1));
    newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists / gamesPlayed).toFixed(1));
    newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals / gamesPlayed).toFixed(1));
    newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks / gamesPlayed).toFixed(1));
    newPlayer.save(function (error, player) {
      if (!error) {
        console.log(player.name + ' was added to the database');
      } else {
        console.log(error);
      }
      response.end();
    });
  });
  return router;
}