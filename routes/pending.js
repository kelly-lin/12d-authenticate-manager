const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/users');

router.route('/').get(userContollers.getPending);

module.exports = router;