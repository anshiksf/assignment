import {Client, expect} from '@loopback/testlab';
import {UserApplication} from '../..';
import {setupApplication} from '../test-helper';

describe('CustomerController', () => {
  let app: UserApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /customers', async () => {
    const customer = {
      name: 'Acme Corporation',
      address: '123 Main St',
    };
    const res = await client
      .post('/customers')
      .send(customer)
      .expect(200);
    expect(res.body).to.containEql(customer);
  });

  it('invokes GET /customers', async () => {
    const res = await client.get('/customers').expect(200);
    expect(res.body).to.be.Array();
  });

  it('gets count of customers', async () => {
    const response = await client.get('/customers/count').expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets array of customer instances', async () => {
    const response = await client.get('/customers').expect(200);
    expect(response.body).to.be.an.Array();
  });

  it('updates all customers', async () => {
    const customer = {
      name: 'New Name',
    };
    const response = await client.patch('/customers').send(customer).expect(200);
    expect(response.body).to.have.property('count');
  });

  it('gets a specific customer by ID', async () => {
    const response = await client.get('/customers/1').expect(200);
    expect(response.body).to.have.property('id');
  });

  it('updates a specific customer by ID', async () => {
    const customer = {
      name: 'New Customer Name',
    };
    await client.patch('/customers/1').send(customer).expect(204);
  });

  it('replaces a specific customer by ID', async () => {
    const customer = {
      name: 'Acme Inc.',
      address: '456 Commerce Rd',
    };
    await client.put('/customers/1').send(customer).expect(204);
  });

  it('deletes a specific customer by ID', async () => {
    await client.del('/customers/1').expect(204);
  });
});
