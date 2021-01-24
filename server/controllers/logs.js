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

function getLogPage(req, res) {
  const options = {
    page: req.params.page,
    limit: 10,
  }

  Log.paginate({}, options, (err, result) => {
    res.json(result);
  });
}
module.exports.getLogPage = getLogPage;