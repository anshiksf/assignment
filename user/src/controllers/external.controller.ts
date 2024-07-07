// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {ExternalProvider} from '../services';

// import {inject} from '@loopback/core';


export class ExternalController {
  constructor(
    @service(ExternalProvider)
    public externalService: ExternalProvider,
    @repository(UserRepository)
    public user: UserRepository
  ) { }

  @get('/external-users')
  async getUsersFromRest(): Promise<any> {
    return this.user.find()
  }
}
