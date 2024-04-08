const { Router } = require('express');
const DataController = require('./data.controller');
const dataRouter = Router();

// ond and direction are the parameters
dataRouter.get('/:ond/:roundtrip', DataController.getData);

module.exports = dataRouter;