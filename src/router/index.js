const express = require('express');
const loginAuthRouter = require('../main/loginAuth/loginAuthRouter');
const sessionAuthRouter = require('../main/sessionAuth/sessionAuthRouter');

const router = express.Router();

router.use('/auth/login', loginAuthRouter);
router.use('/auth/session', sessionAuthRouter);

module.exports = router;