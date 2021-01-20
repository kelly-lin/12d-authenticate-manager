const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/user.model');

const newUser1Object = {
  username: 'AUKL500446',
  name: 'Lin,Kelly',
  email: 'Kelly.Lin@wsp.com',
  projectApproved: 'Appin Road',
  projectCode: 'PS158157319',
  isPending: true
}

const newUser2Object = {
  username: 'AURM500508',
  name: 'McNeil,Roisin',
  email: 'Roisin.McNeill@wsp.com',
  projectApproved: 'PLR',
  projectCode: 'PS158157315',
  isPending: true
}

const newUser3Object = {
  username: 'John.Appleseed',
  name: 'Appleseed,John',
  email: 'john.appleseed@john.com',
  projectApproved: 'Gawler Electrification Project',
  projectCode: 'PS2154125',
  isPending: true
}

const users = {
  user1: newUser1Object,
  user2: newUser2Object,
  user3: newUser3Object
}
module.exports.users = users

const mongoServer = new MongoMemoryServer();

// Connects to the memory database
const connect = async () => {
  const mongoUri = await mongoServer.getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  await mongoose.connect(mongoUri, options, (err) => {
    if (err) console.error(err);
  });
}
module.exports.connect = connect;

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
}
module.exports.disconnect = disconnect;

const clear = async () => {
  await mongoose.connection.dropDatabase();
}
module.exports.clear = clear;

async function test(){
  connect();
  await new User(users.user1).save();
  await new User(users.user2).save();
  await User.find().then(res => console.log('after adding: ' + res.length));
  await clear();
  await User.find().then(res => console.log('after clearing: ' + res.length));
  await new User(users.user1).save();
  await new User(users.user2).save();
  await User.find().then(res => console.log('after adding again: ' + res.length));
  disconnect();
}
// test();