import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ExternalDataSource} from '../datasources';

export interface External {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class ExternalProvider implements Provider<External> {
  constructor(
    // external must match the name property in the datasource json file
    @inject('datasources.external')
    protected dataSource: ExternalDataSource = new ExternalDataSource(),
  ) {}

  value(): Promise<External> {
    return getService(this.dataSource);
  }
}
