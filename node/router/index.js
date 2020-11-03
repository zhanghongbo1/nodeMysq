var express = require('express');
const pool = require('../mysql/index')
const router = express.Router();
const loginRouter = require('./loginRouter')
const typesRouter = require('./types')
const uoloadRouter = require('./picUpload')
router.use('/', loginRouter)
router.use('/', typesRouter)
router.use('/', uoloadRouter)
module.exports = router;