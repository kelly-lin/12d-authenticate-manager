let User = require('../models/user.model');
const error = require('../services/error');

function getUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error! ' + err));
}
module.exports.getUsers = getUsers;

function addUser(req, res) {
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
    projectCode: projectCode,
    isPending: true
  });
  
  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json(error.throw()));
}
module.exports.addUser = addUser;