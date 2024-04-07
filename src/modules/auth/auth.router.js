const { Router } = require('express');
const AuthController = require('./auth.controller');
const authRouter = Router();

router.get('/:key', AuthController.getPermissions);

module.exports = authRouter;