const express = require('express');
const router = express.Router();
const validation = require('../../middlewares/validation.middleware');
const shirtsController = require('./shirts.controller')

router.post('/', validation, shirtsController.post);
router.get('/', validation, shirtsController.get);
router.get('/:id', validation, shirtsController.getById);
router.put('/:id', validation, shirtsController.updateById);
router.delete('/:id', validation, shirtsController.deleteById);

module.exports = router;