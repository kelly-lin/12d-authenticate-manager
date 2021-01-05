const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/user.model');
const request = require('supertest');
const app = require('../../app');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
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
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('Get all users returns 2', async () => {
  const data = await request(app).get('/users');
  expect(data.body.length).toBe(2);
});

test('Add user', async () => {
  const newUser = {
    username: 'John.Appleseed',
    name: 'Appleseed,John',
    email: 'john.appleseed@john.com',
    pName: 'dt',
    pCode: 'dt'
  }

  await request(app).post('/users/add')
    .send(newUser)
    .catch(err => console.log('Error!: ' + err));
  
  const numOfUsers = await User.find().countDocuments((err, count) => {
    if(err) console.log(err);
    return count;
  });

  expect(numOfUsers).toBe(3);
});