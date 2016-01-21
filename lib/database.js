import mongoose from 'mongoose';
import * as my from './configDBandServer';

export function database() {
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
        name: {type: String, unique: true, required: true },
        team: {type: String, required: true },
        age: {type: Number, required: true },
        height: {
          feet: Number,
          inches: Number,
        },
        position: {type: String, required: true },
        rookie: Boolean,
        numberOfGamesPlayed: Number,
        totals: {
          points: Number,
          rebounds: Number,
          assists: Number,
          steals: Number,
          blocks: Number,
        },
        average: {
          pointsPerGame: Number,
          reboundsPerGame: Number,
          assistsPerGame: Number,
          stealsPerGame: Number,
          blocksPerGame: Number,
        }
      });
      const player = mongoose.model('Player',PlayerStatsSchema );
      return player;
    }
  }
  return dbData;
}
