const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

module.exports.users = {
  user1: () => {
    user = {
      username: 'AUKL500446',
      name: 'Lin,Kelly',
      email: 'Kelly.Lin@wsp.com',
      projectApproved: 'Appin Road',
      projectCode: 'PS158157319',
      isPending: true,
      password: '1234'
    };

    return user;
  },
  user2: () => {
    user = {
      username: 'AURM500508',
      name: 'McNeil,Roisin',
      email: 'Roisin.McNeill@wsp.com',
      projectApproved: 'PLR',
      projectCode: 'PS158157315',
      isPending: true,
      password: '1234'
    };

    return user;
  },
  user3: () => {
    let user = {    
      username: 'John.Appleseed',
      name: 'Appleseed,John',
      email: 'john.appleseed@john.com',
      projectApproved: 'Gawler Electrification Project',
      projectCode: 'PS2154125',
      isPending: true,
      password: '1234'
    };

    return user;
  }
}

const mongoServer = new MongoMemoryServer();

// Connects to the memory database
module.exports.connect = async () => {
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

module.exports.disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports.clear = async () => {
  await mongoose.connection.dropDatabase();
}