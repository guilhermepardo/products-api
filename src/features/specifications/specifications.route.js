const express = require('express');
const router = express.Router();
const validation = require('../../middlewares/validation.middleware');
const specificationsController = require('./specifications.controller')

router.post('/', validation, specificationsController.post);
router.get('/', validation, specificationsController.get);
router.get('/:id', validation, specificationsController.getById);
router.put('/:id', validation, specificationsController.updateById);
router.delete('/:id', validation, specificationsController.deleteById);

module.exports = router;