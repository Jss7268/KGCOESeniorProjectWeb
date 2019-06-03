import { Injectable } from '@angular/core';

const ACCESS_NAMES = ['Default', 'Authorized Device', 'Elevated User', 'Admin User'];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  getAccessName(accessLevel: number) {
    console.log(accessLevel)
    return ACCESS_NAMES[accessLevel];
  }
}
