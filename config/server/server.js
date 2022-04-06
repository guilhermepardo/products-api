const express = require('express');
// const { Router } = require('express');
// const MongoConnect = require('../mongodb/Connect');
require('dotenv').config();
const shirtsRoutes = require('../../src/features/shirts/shirts.route');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_DB_ATLAS);

const app = express();

// const router = Router();

// router.get('/', async (req, res) => {
//   const database = req.app.locals.db;
//   const collection = database.collection('shirts');
//   const shirtsFound = await collection.find({}).toArray();
//   res.json({ shirtsFound: shirtsFound });
// });

app.use('/api/v1/shirts', shirtsRoutes);
// app.use('/api/v1/shirts', router);

client.connect(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Listening on port 3000'));
  app.locals.db = client.db('db');
});

// class App {
//   constructor() {
//     this.app = express();
//     this.client = new MongoClient(process.env.MONGO_DB_ATLAS);
//     this.middlewares();
//     this.routes();
//     this.initialize();
//   };

//   async middlewares() {
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(express.json());
//   };

//   async routes() {
//     this.app.use('/api/v1/shirts', shirtsRoutes);
//   };

//   async initialize() {
//     try {
//       this.client.connect(() => {
//         console.log('Connected to MongoDB');
//         this.app.listen(3000, () => console.log('Listening on port 3000'));
//         this.app.locals.db = this.client.db('db');
//       });
//     } catch (error) {
//       throw error;
//     };
//     // try {
//     //   await this.client.connect();
//     //   this.app.listen(3000, () => console.log('Listening on port 3000'));
//     //   this.app.locals.database = await this.client.database('db');
//     // } catch (error) {
//     //   console.log('error :>>', error);
//     //   throw error;
//     // };
//   };

// };

// module.exports = new App().app;

