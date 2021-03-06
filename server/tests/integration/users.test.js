const User = require('../../models/user.model');
const request = require('supertest');
const app = require('../../app');
const db = require('../fixtures/database');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

afterEach(async () => {
  await db.clear();
})

test('Get all users returns 2', async () => {
  let user1 = db.users.user1();
  user1['isPending'] = false;

  let user2 = db.users.user2();
  user2['isPending'] = false;

  await new User(user1).save();
  await new User(user2).save();

  const data = await request(app).get('/users');

  expect(data.body.length).toBe(2);
});

test('Add user', async () => {
  const numOfUsersStart = await User.find().countDocuments((err, count) => {
    if(err) console.log(err);
    return count;
  });

  expect(numOfUsersStart).toBe(0);

  await request(app).post('/users/add')
    .send(db.users.user1())
    .catch(err => console.log('Error!: ' + err));
  
  const numOfUsers = await User.find().countDocuments((err, count) => {
    if(err) console.log(err);
    return count;
  });

  expect(numOfUsers).toBe(1);
});

test('add pending', async () => {
  let users = await request(app).get('/users/pending').then(result => result.body);
  expect(users.length).toBe(0);

  await new User(db.users.user1()).save();
  users = await request(app).get('/users/pending').then(result => result.body);
  expect(users.length).toBe(1);
});