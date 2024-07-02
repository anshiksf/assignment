import {Entity, model, property} from '@loopback/repository';

export enum RoleKey {
	ADMIN = "admin",
	USER = "user"
}

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(RoleKey),
    },
  })
  key: RoleKey;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
