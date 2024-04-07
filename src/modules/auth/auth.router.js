const { Router } = require('express');
const AuthController = require('./auth.controller');
const authRouter = Router();

authRouter.get('/:key', AuthController.getPermissions);

module.exports = authRouter;