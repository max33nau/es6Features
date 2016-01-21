
import express from 'express';
import * as my from './configDBandServer';
import {database} from './database';
import {stats} from './stats';

const app = express();
const dbData = database();

app.use('/player', stats());

const server = app.listen(process.env.PORT || my.serverPort, ()=>{
  console.log('server is connected');
  dbData.start(()=> {
    console.log('connected to database');
  });
});
