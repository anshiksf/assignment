import {Client, expect} from '@loopback/testlab';
import {UserApplication} from '../..';
import {setupApplication} from '../test-helper';

describe('RoleController', () => {
  let app: UserApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /roles', async () => {
    const role = {
      name: 'Admin',
      key: 'admin',
    };
    const res = await client
      .post('/roles')
      .send(role)
      .expect(200);
    expect(res.body).to.containEql(role);
  });

  it('invokes GET /roles', async () => {
    const res = await client.get('/roles').expect(200);
    expect(res.body).to.be.Array();
  });

  it('gets count of roles', async () => {
    const response = await client.get('/roles/count').expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets array of role instances', async () => {
    const response = await client.get('/roles').expect(200);
    expect(response.body).to.be.an.Array();
  });

  it('updates all roles', async () => {
    const role = {
      name: 'User Role',
    };
    const response = await client.patch('/roles').send(role).expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets a specific role by ID', async () => {
    const response = await client.get('/roles/1').expect(200);
    expect(response.body).to.have.property('id');
  });

  it('updates a specific role by ID', async () => {
    const role = {
      name: 'User',
    };
    await client.patch('/roles/1').send(role).expect(204);
  });

  it('replaces a specific role by ID', async () => {
    const role = {
      name: 'Super Admin',
      key: 'admin',
    };
    await client.put('/roles/1').send(role).expect(204);
  });

  it('deletes a specific role by ID', async () => {
    await client.del('/roles/1').expect(204);
  });
});
