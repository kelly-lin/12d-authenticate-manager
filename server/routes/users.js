const router = require('express').Router();
const usersContoller = require('../controllers/users');

router.route('/').get(usersContoller.getUsers);
router.route('/add').post(usersContoller.addUser);
router.route('/pending').get(usersContoller.getPendingUsers);
router.route('/update/:id').post(usersContoller.updateUser);

module.exports = router;