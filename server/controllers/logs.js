const Log = require('../models/log.model');

function getLogs(req, res) {
  Log.find()
    .sort({ accessDate: -1 })
    .then(logs => {
      res.json(logs);
    })
    .catch(err => res.status(400).json('Error! ' + err));
}
module.exports.getLogs = getLogs;