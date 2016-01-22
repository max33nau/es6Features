import express from 'express';
import bodyParser from 'body-parser';
import {database} from './database';

const dbData = database();
const Player = dbData.createSchema();
const router = express.Router();

export function stats() {
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: false}));

  router.post('/', (request, response) => {
    let newPlayer = new Player();
    let gamesPlayed = Number(request.body.numberOfGamesPlayed);
    newPlayer.name = request.body.name;
    newPlayer.team = request.body.team;
    newPlayer.age = request.body.age;
    newPlayer.height.feet = request.body.feet;
    newPlayer.height.inches = Number(request.body.inches);
    newPlayer.position = request.body.position;
    newPlayer.rookie = request.body.rookie;
    newPlayer.numberOfGamesPlayed = gamesPlayed;
    newPlayer.totals.points = Number(request.body.totalPoints);
    newPlayer.totals.rebounds = Number(request.body.totalRebounds);
    newPlayer.totals.assists = Number(request.body.totalAssists);
    newPlayer.totals.steals = Number(request.body.totalSteals);
    newPlayer.totals.blocks = Number(request.body.totalBlocks);
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
