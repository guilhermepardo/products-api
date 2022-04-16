const express = require('express');
const router = express.Router();
const validation = require('../../middlewares/validation.middleware');
const specificationsController = require('./specifications.controller')

router.post('/', validation, specificationsController.post);

module.exports = router;