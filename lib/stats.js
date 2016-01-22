import express from 'express';
import bodyParser from 'body-parser';
import {database} from './database';

const dbData = database();
const Player = dbData.createSchema();
const router = express.Router();

export function stats() {
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: false}));

  router.get('/', (request, response) => {
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
  });

  router.post('/', (request, response) => {
    let newPlayer = new Player();
    let gamesPlayed = Number(request.body.numberOfGamesPlayed);
    newPlayer.name = request.body.name;
    newPlayer.team = request.body.team;
    newPlayer.age = request.body.age;
    newPlayer.height.feet = request.body.feet;
    newPlayer.height.inches = request.body.inches;
    newPlayer.position = request.body.position;
    newPlayer.rookie = request.body.rookie;
    newPlayer.numberOfGamesPlayed = gamesPlayed;
    newPlayer.totals.points = request.body.totalPoints;
    newPlayer.totals.rebounds = request.body.totalRebounds;
    newPlayer.totals.assists = request.body.totalAssists;
    newPlayer.totals.steals = request.body.totalSteals;
    newPlayer.totals.blocks = request.body.totalBlocks;
    newPlayer.average.pointsPerGame = Number((newPlayer.totals.points/gamesPlayed).toFixed(1));
    newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds/gamesPlayed).toFixed(1));
    newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists/gamesPlayed).toFixed(1));
    newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals/gamesPlayed).toFixed(1));
    newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks/gamesPlayed).toFixed(1));
    newPlayer.save(( error,player ) => {
      if(!error) {
        console.log(`${player.name} was added to the database`);
      } else {
        console.log(error);
      }
      response.end();
    });
  });
  return router;
}
