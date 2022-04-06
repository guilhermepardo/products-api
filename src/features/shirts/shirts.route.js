const express = require('express');
const router = express.Router();
const shirtsController = require('./shirts.controller')

router.post('/', shirtsController.post);
router.get('/', shirtsController.get);
router.get('/:id', shirtsController.getById);
router.put('/:id', shirtsController.updateById);
router.delete('/:id', shirtsController.deleteById);

module.exports = router;


