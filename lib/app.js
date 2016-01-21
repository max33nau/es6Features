
import express from 'express';
import * as my from './configDBandServer';
import {database} from './database';

const app = express();
const dbData = database();

const server = app.listen(process.env.PORT || my.serverPort, ()=>{
  console.log('server is connected');
  dbData.start(()=> {
    console.log('connected to database');
  });
});
