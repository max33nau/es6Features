import mongoose from 'mongoose';
import * as my from './configDBandServer';



export function database() {
  function toUpper(value) { return value.toUpperCase()}
  function validator(value) { return !isNaN(value) };
  const check = [validator, 'You did not enter a number for that stat']
  let db;
  let PlayerStatsSchema;
  const dbData = {
    start(callback) {
      mongoose.connect(`${my.dbConnect}${my.dbName}`);
      db = mongoose.connection;
      db.on('error', error => {
        console.log(error);
        db.close();
      });
      db.once('open', callback);
    },
    mongoose,
    db,
    createSchema() {
      const Schema = mongoose.Schema;
      PlayerStatsSchema = new Schema({
        name: {type: String, unique: true, required: true, set: toUpper  },
        team: {type: String, required: true, set: toUpper },
        age: {type: Number, required: true,  validate: check },
        height: {
          feet: {type: Number,  validate: check },
          inches: {type: Number,  validate: check },
        },
        position: {type: String, required: true, set: toUpper },
        rookie: Boolean,
        numberOfGamesPlayed: {type: Number, required: true,  validate: check },
        totals: {
          points: {type: Number, validate: check },
          rebounds: {type: Number, validate: check },
          assists: {type: Number, validate: check },
          steals: {type: Number, validate: check },
          blocks: {type: Number, validate: check },
        },
        average: {
          pointsPerGame: {type: Number, validate: check },
          reboundsPerGame: {type: Number, validate: check },
          assistsPerGame: {type: Number, validate: check },
          stealsPerGame: {type: Number, validate: check },
          blocksPerGame: {type: Number, validate: check },
        }
      });
      const player = mongoose.model('Player',PlayerStatsSchema );
      return player;
    }
  }
  return dbData;
}
