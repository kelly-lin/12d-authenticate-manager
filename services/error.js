const error = {
  throw: err => res.status(400).json('Error! ' + err)
}

module.exports = error;