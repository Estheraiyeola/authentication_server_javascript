const assert = require('assert');
const { createUser , authenticateUser } = require('../main/service/user_service');
const User = require('../main/model/user');
const sequelize = require('../main/config/database');

describe('User Service', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a new user', async () => {
    const uniqueEmail = `estheraiyeola+${Date.now()}@yahoo.com`;
    const user = {
      firstName: 'Esther',
      lastName: 'Aiyeola',
      email: uniqueEmail,
      password: 'password'
    };

    const newUser = await createUser(user);
    assert(newUser.id);
    assert.strictEqual(newUser.firstName, user.firstName);
    assert.strictEqual(newUser.lastName, user.lastName);
    assert.strictEqual(newUser.email, user.email);
  });

  it('should not create a user with an existing email', async () => {
    const uniqueEmail = `estheraiyeola+${Date.now()}@yahoo.com`;
    const user = {
      firstName: 'Esther',
      lastName: 'Aiyeola',
      email: uniqueEmail,
      password: 'password'
    };

    const newUser = await createUser(user);
    assert(newUser.id);
    
    await assert.rejects(async () => {
      await createUser(user);
    });
  });

  it('should be able to login with the email and password', async () => {
    const uniqueEmail = `estheraiyeola+${Date.now()}@yahoo.com`;
    const user = {
      firstName: 'Esther',
      lastName: 'Aiyeola',
      email: uniqueEmail,
      password: 'password'
    };

    const newUser = await createUser(user);
    assert(newUser.id);

    const req = {
        email : user.email,
        password : 'password'
    }
    const response = await authenticateUser(req);
    assert.strictEqual(response.message, 'User authenticated successfully');
    
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
