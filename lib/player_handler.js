import {database} from './database';

const dbData = database();
const Player = dbData.createSchema();

export function getAll(request,response) {
  Player.find({})
    .sort({name: 'asc'})
    .then( players => {
      if(players) {
        response.send(players);
        response.end();
      }
    })
    .then( null, error => {
      response.send(error);
      resonse.end();
    });
};

export function getPlayerById(request,response) {
  Player.findById(request.params.id)
    .then( player => {
      if(player) {
        response.send(player);
      } else {
        response.send('that id does not exist in the database')
      }
    })
    .then(null, error => {
      response.send(error);
    });
    response.end();
}

export function createPlayer(request,response) {
  let newPlayer = new Player();
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
  newPlayer.average.pointsPerGame = Number((newPlayer.totals.points/newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds/newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists/newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals/newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks/newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.save(( error,player ) => {
    if(!error) {
      response.send(`${player.name} was added to the database`);
    } else {
      response.send(error);
    }
    response.end();
  });
};

export function updatePlayerInfo(request,response) {
  Player.update({_id: request.params.id}, {$set: request.body}, error => {
    if(error) {
      response.send(error);
      response.end();
    } else {
      response.send(`update data was a success`);
      response.end()
    }
  });
}

export function removePlayer(request,response) {
  Player.remove({_id: request.params.id})
    .then((player,error) => {
      if(player) {
        response.send(`${request.params.id} was removed`);
        response.end();
      }
    })
    .then(null, error => {
      if(error) {
        response.send(error);
        response.end();
      }
    });
}
