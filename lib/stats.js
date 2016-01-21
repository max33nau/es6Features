import express from 'express';
import bodyParser from 'body-parser';
import {database} from './database';

const dbData = database();
const Player = dbData.createSchema();
const router = express.Router();
router.use(bodyParser.json());
