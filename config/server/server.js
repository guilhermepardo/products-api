const express = require('express');
const MongoConnect = require('../mongodb/mongo.connection');
require('dotenv').config();
const morgan = require('morgan')
const shirtsRoutes = require('../../src/features/shirts/shirts.route');
const specificationsRoutes = require('../../src/features/specifications/specifications.route');
class App {
  constructor() {
    this.app = express();
    this.client = new MongoConnect(process.env.MONGO_DB_ATLAS);
    this.initialize();
    this.middlewares();
    this.routes();
  };

  async middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('dev'))
  };

  async routes() {
    this.app.use('/api/v1/shirts', shirtsRoutes);
    this.app.use('/api/v1/specifications', specificationsRoutes);
  };

  async initialize() {
    try {
      await this.client.connect();
      this.app.listen(3000, () => console.log('Listening on port 3000'));
      this.app.locals.db = await this.client.database('db');
    } catch (error) {
      console.log('error :>>', error);
      throw error;
    };
  };

};

module.exports = new App().app;

