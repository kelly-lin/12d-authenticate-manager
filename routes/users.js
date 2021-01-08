const router = require('express').Router();
const userContollers = require('../controllers/users');

router.route('/').get(userContollers.getUsers);
router.route('/add').post(userContollers.addUser);
router.route('/pending').get(userContollers.getPendingUsers);
router.route('/update/:id').post(userContollers.updateUser);

module.exports = router;