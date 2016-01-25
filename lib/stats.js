import express from 'express';
import bodyParser from 'body-parser';
import {database} from './database';
import * as playerHandler from './player_handler'

// const dbData = database();
// const Player = dbData.createSchema();
const router = express.Router();

export function stats() {
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: false}));
  router.get('/', playerHandler.getAll);
  router.get('/:id', playerHandler.getPlayerById);
  router.post('/', playerHandler.createPlayer);
  router.put('/:id', playerHandler.updateWholeObject);
  router.patch('/:id', playerHandler.updatePlayerInfo);
  router.delete('/:id', playerHandler.removePlayer);
  return router;
}
