// src/__tests__/helpers/test-helper.ts

import {
  Client,
  createRestAppClient,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {UserApplication} from '../application';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    port: +(process.env.PORT ?? 3000),
    host: process.env.HOST,
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      setServersFromRequest: true,
    },
  });

  const app = new UserApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: UserApplication;
  client: Client;
}
