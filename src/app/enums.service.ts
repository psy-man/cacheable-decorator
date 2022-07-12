import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cacheable } from './cacheable';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {
  constructor(private http: HttpClient) {
  }

  @Cacheable({
    secondsToExpiration: 10 * 60 // 10m
  })
  getUser(id: number) {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
  }
}
