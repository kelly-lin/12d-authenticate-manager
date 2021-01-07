const router = require('express').Router();
const userContollers = require('../controllers/users');

// Get all the users from the database
router.route('/').get(userContollers.getUsers);
router.route('/add').post(userContollers.addUser);
router.route('/pending').get(userContollers.getPendingUsers);

module.exports = router;