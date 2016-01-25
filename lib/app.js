
import express from 'express';
import * as my from './configDBandServer';
import {database} from './database';
import {stats} from './stats';


export function start(callback) {
  const app = express();
  const dbData = database();

  app.use('/player', stats());

  let server = app.listen(process.env.PORT || my.serverPort, ()=>{
    console.log('server is connected');
    dbData.start(()=> {
      console.log('connected to database');
      callback();
    });
  });

  return {
    close(callback) {
      server.close(() => {
          dbData.mongoose.connection.close(callback);
        });
    }
  };

}
