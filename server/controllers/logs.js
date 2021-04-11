const Log = require('../models/log.model');

module.exports.getLogs = (req, res) => {
  Log.find()
    .sort({ accessDate: -1 })
    .then(logs => {
      res.json(logs);
    })
    .catch(err => res.status(400).json('Error! ' + err));
}

module.exports.getLogPage = (req, res) => {
  const options = {
    page: req.params.page,
    sort: { accessDate: -1 },
    limit: 10,
  }

  Log.paginate({}, options, (err, result) => {
    res.json(result);
  });
}

module.exports.getUserLogs = (req, res) => {
  const username = req.params.username;
  const options = {
    page: req.params.page,
    sort: { accessDate: -1 },
    limit: 10,
  }

  Log.paginate({ username: username }, options, (err, result) => {
    res.json(result);
  })
}