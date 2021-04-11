let User = require('../models/user.model');

module.exports.login = (req, res) => {
  console.log(req.body);
}

module.exports.register = (req, res) => {

}

module.exports.getUsers = (req, res) => {
  User.find({ isPending: false })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error! ' + err));
}

module.exports.addUser = (req, res) => {
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

module.exports.getPendingUsers = (req, res) => {
  User.find({ isPending: true })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error! ' + err));
}

module.exports.updateUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name =
        req.body.name ?? user.name;

      user.email =
        req.body.email ?? user.email;

      user.username =
        req.body.username ?? user.username;
        
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
      
      console.log(user);
      user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
}

module.exports.getUserProfile = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => res.json(user))
    .catch(err => res.json(err));
}

module.exports.getUserMetrics = (req, res) => {
  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;

  console.log(fromDate);
  console.log(toDate);

  res.json({ fromDate: fromDate, toDate: toDate });
  const metrics = {
    numberOfUsers: 0,
    userFrequencyData: {}
  }
}