const { Router } = require('express');
const MessagesController = require('./messages.controller');
const router = Router();

router.get('/post/:message', MessagesController.create);
router.get('/get/:id', MessagesController.findOne);
router.get('/getAll', MessagesController.findAll);
router.get('/nber', MessagesController.count);
router.get('/del/:id', MessagesController.delete);

module.exports = router;