import mongoose from 'mongoose';
import * as my from './configDBandServer';



export function database() {
  function toUpper(value) { return value.toUpperCase()};
  function convertToNumber(value) { if(isNaN(Number(value))) return 'not number';
                                    else return Number(value)}
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
        age: {type: Number, required: true,  set: convertToNumber, validate: check },
        height: {
          feet: {type: Number,  set: convertToNumber, validate: check },
          inches: {type: Number,  set: convertToNumber, validate: check },
        },
        position: {type: String, required: true, set: toUpper },
        rookie: Boolean,
        numberOfGamesPlayed: {type: Number, required: true,  set: convertToNumber, validate: check },
        totals: {
          points: {type: Number, set: convertToNumber, validate: check },
          rebounds: {type: Number, set: convertToNumber, validate: check },
          assists: {type: Number, set: convertToNumber, validate: check },
          steals: {type: Number, set: convertToNumber, validate: check },
          blocks: {type: Number, set: convertToNumber, validate: check },
        },
        average: {
          pointsPerGame: {type: Number, set: convertToNumber, validate: check },
          reboundsPerGame: {type: Number, set: convertToNumber, validate: check },
          assistsPerGame: {type: Number, set: convertToNumber, validate: check },
          stealsPerGame: {type: Number, set: convertToNumber, validate: check },
          blocksPerGame: {type: Number, set: convertToNumber, validate: check },
        }
      });
      const player = mongoose.model('Player',PlayerStatsSchema );
      return player;
    }
  }
  return dbData;
}
