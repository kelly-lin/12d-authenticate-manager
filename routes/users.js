const router = require('express').Router();
let User = require('../models/user.model');

const getUsers = require('../controllers/getUsers');

// Get all the users from the database
router.route('/').get(getUsers);

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const projectApproved = req.body.pName;
  const projectCode = req.body.pCode;

  const newUser = new User({
    username: username,
    name: name,
    email: email,
    projectApproved: projectApproved,
    projectCode: projectCode
  });
  
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error! ' + err));
});

module.exports = router;