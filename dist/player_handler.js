'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.getPlayerById = getPlayerById;
exports.createPlayer = createPlayer;
exports.updatePlayerInfo = updatePlayerInfo;

var _database = require('./database');

var dbData = (0, _database.database)();
var Player = dbData.createSchema();

function getAll(request, response) {
  Player.find({}).sort({ name: 'asc' }).then(function (players) {
    if (players) {
      response.send(players);
      response.end();
    }
  }).then(null, function (error) {
    response.send(error);
    resonse.end();
  });
};

function getPlayerById(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      response.send(player);
      response.end();
    }
  }).then(null, function (error) {
    response.send(error);
    response.end();
  });
}

function createPlayer(request, response) {
  var newPlayer = new Player();
  newPlayer.name = request.body.name;
  newPlayer.team = request.body.team;
  newPlayer.age = request.body.age;
  newPlayer.height.feet = request.body.feet;
  newPlayer.height.inches = request.body.inches;
  newPlayer.position = request.body.position;
  newPlayer.rookie = request.body.rookie;
  newPlayer.numberOfGamesPlayed = request.body.numberOfGamesPlayed;
  newPlayer.totals.points = request.body.totalPoints;
  newPlayer.totals.rebounds = request.body.totalRebounds;
  newPlayer.totals.assists = request.body.totalAssists;
  newPlayer.totals.steals = request.body.totalSteals;
  newPlayer.totals.blocks = request.body.totalBlocks;
  newPlayer.average.pointsPerGame = Number((newPlayer.totals.points / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.save(function (error, player) {
    if (!error) {
      response.send(player.name + ' was added to the database');
    } else {
      response.send(error);
    }
    response.end();
  });
};

function updatePlayerInfo(request, response) {
  Player.update({ _id: request.params.id }, { $set: request.body }, function (error) {
    if (error) {
      response.send(error);
      response.end();
    } else {
      response.send('update data was a success');
      response.end();
    }
  });
}