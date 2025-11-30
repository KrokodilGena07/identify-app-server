const express = require('express');
const loginAuthRouter = require('../main/loginAuth/loginAuthRouter');

const router = express.Router();

router.use('/auth/login', loginAuthRouter);

module.exports = router;