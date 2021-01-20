const router = require('express').Router();
const logsController = require('../controllers/logs');

router.route('/').get(logsController.getLogs);

module.exports = router;