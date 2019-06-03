import { Access } from './../classes/access';
import { Injectable } from '@angular/core';

const ACCESSES: Access[] = [
  {
    access_level: 0,
    access_name: 'default',
    description: 'Default'
  },
  {
    access_level: 1,
    access_name: 'authorized_device',
    description: 'Authorized Device'
  },
  {
    access_level: 2,
    access_name: 'elevated_user',
    description: 'Elevated User'
  },
  {
    access_level: 3,
    access_name: 'admin_user',
    description: 'Admin User'
  },
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public ACCESSES = ACCESSES;
  constructor() { }
  
  getAccessName(accessLevel: number): string {
    return ACCESSES[accessLevel].description;
  }

  getAccesses(): Access[] {
    return ACCESSES;
  }
}
