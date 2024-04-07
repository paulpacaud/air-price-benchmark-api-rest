const express = require('express');
const {isAuthenticated} = require("./common/middleware/auth.middleware");
const authRouter = require("./modules/auth/auth.router");
const dataRouter = require("./modules/data/data.router");

const router = express.Router();

router.use('/auth', authRouter);
router.use('/data', isAuthenticated, dataRouter);

module.exports = router;