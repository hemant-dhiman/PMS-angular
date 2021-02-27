import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { users } from './users';

@Injectable({
  providedIn: 'root',
})
export class MockDataUsers implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        fullName: 'Hemant Dhiman',
        userName: 'HD1234',
        email: 'hemant@datability.co',
        password: '12345',
        address: {
          line1: 'partap bhawan',
          line2: 'near Rani Taal',
          district: 'sirmaur',
          state: 'himachal pradesh',
          pinCode: '173001',
        },
      },
    ];
    return { users };
  }

  genId(user: users[]) {
    return user.length > 0 ? Math.max(...user.map((user) => user.id)) + 1 : 100;
  }

  hasUser(userName: string, password: string) {
      
  }

}
