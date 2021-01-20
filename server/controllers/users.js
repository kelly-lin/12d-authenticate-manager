let User = require('../models/user.model');

function getUsers(req, res) {
  User.find({ isPending: false })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error! ' + err));
}
module.exports.getUsers = getUsers;

function addUser(req, res) {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const projectApproved = req.body.projectApproved;
  const projectCode = req.body.projectCode;
  
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
  .catch(err => res.status(400).json('Error! ' + err));
}
module.exports.addUser = addUser;

function getPendingUsers(req, res) {
  User.find({ isPending: true })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error! ' + err));
}
module.exports.getPendingUsers = getPendingUsers;

function updateUser(req, res) {
  User.findById(req.params.id)
    .then(user => {
      user.email =
        req.body.email ?? req.body.email;
        
      user.accessLevel =
        req.body.accessLevel ?? user.accessLevel;
        
      user.lastActive =
        req.body.lastActive ?? user.lastActive;
        
      user.dateAuthenticated =
        req.body.dateAuthenticated ?? user.dateAuthenticated;
        
      user.authenticatedBy =
        req.body.authenticatedBy ?? user.authenticatedBy;
        
      user.expiryDate =
        req.body.expiryDate ?? user.expiryDate;
        
      user.isPending =
        req.body.isPending ?? user.isPending;
      
      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
}
module.exports.updateUser = updateUser;