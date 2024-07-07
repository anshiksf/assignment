import {Client, expect} from '@loopback/testlab';
import {UserApplication} from '../..';
import {setupApplication} from '../test-helper';

describe('UserController', () => {
  let app: UserApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /users', async () => {
    const user = {
      name: 'John Doe',
      customerId: 1,
    };
    const res = await client
      .post('/users')
      .send(user)
      .expect(200);
    expect(res.body).to.containEql(user);
  });

  it('invokes GET /users', async () => {
    const res = await client.get('/users').expect(200);
    expect(res.body).to.be.Array();
  });

  it('gets count of users', async () => {
    const response = await client.get('/users/count').expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets array of user instances', async () => {
    const response = await client.get('/users').expect(200);
    expect(response.body).to.be.an.Array();
  });

  it('updates all users', async () => {
    const user = {
      name: 'Jane Doe',
    };
    const response = await client.patch('/users').send(user).expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets a specific user by ID', async () => {
    const response = await client.get('/users/1').expect(200);
    expect(response.body).to.have.property('id');
  });

  it('updates a specific user by ID', async () => {
    const user = {
      name: 'Jane Smith',
    };
    await client.patch('/users/1').send(user).expect(204);
  });

  it('replaces a specific user by ID', async () => {
    const user = {
      name: 'John Smith',
      customerId: 1,
    };
    await client.put('/users/1').send(user).expect(204);
  });

  it('deletes a specific user by ID', async () => {
    await client.del('/users/1').expect(204);
  })
});
