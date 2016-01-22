import {database} from './database';

const dbData = database();
const Player = dbData.createSchema();

export function getAll(request,response) {
  Player.find({})
    .sort({name: 'asc'})
    .then((players,error) => {
      if(players) response.send(players);
      else return error;
    })
    .then( (error = false) => {
      if(error) {
        console.log(error);
        response.send(error);
      }
    })
    .then(() => { response.end(); }
    );
};

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
      console.log(`${player.name} was added to the database`);
    } else {
      console.log(error);
    }
    response.end();
  });
};
