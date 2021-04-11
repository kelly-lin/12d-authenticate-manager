const router = require('express').Router();
const usersController = require('../controllers/users');

router.route('/').get(usersController.getUsers);
router.route('/login').post(usersController.login);
router.route('/register').post(usersController.register);
router.route('/add').post(usersController.addUser);
router.route('/pending').get(usersController.getPendingUsers);
router.route('/metrics?:fromDate-:toDate').get(usersController.getUserMetrics);
router.route('/update/:id').post(usersController.updateUser);
router.route('/profile/:id').get(usersController.getUserProfile);

module.exports = router;