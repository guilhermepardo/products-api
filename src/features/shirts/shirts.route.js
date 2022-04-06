const express = require('express');
const router = express.Router();
const shirtsController = require('./shirts.controller')

router.get('/get', shirtsController.get);
// router.get('/get', async (req, res) => {
//     const database = req.app.locals.db;
//     const collection = database.collection('users');
//     const shirtsFound = await collection.find({}).toArray();
//     res.json({ shirtsFound: shirtsFound });
// });

module.exports = router;


