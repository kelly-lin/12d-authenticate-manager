const router = require('express').Router();
const logsController = require('../controllers/logs');

router.route('/').get(logsController.getLogs);
router.route('/page/:page').get(logsController.getLogPage);

module.exports = router;