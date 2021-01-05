const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/user.model');

const createDatabase = async () => {
  let mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  await mongoose.connect(mongoUri, options, (err) => {
    if (err) console.error(err);
  });
  
  const newUser1 = new User({
    username: 'AUKL500446',
    name: 'Lin,Kelly',
    email: 'Kelly.Lin@wsp.com',
    projectApproved: 'Appin Road',
    projectCode: 'PS158157319'
  });
  await newUser1.save();
  
  const newUser2 = new User({
    username: 'AURM500508',
    name: 'McNeil,Roisin',
    email: 'Roisin.McNeill@wsp.com',
    projectApproved: 'PLR',
    projectCode: 'PS158157315'
  });
  await newUser2.save();

  return mongoServer;
}

module.export = createDatabase;