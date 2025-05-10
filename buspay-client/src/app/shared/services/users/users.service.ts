import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { StatusCode } from '../../../core/utilities/buspay.enums';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClientService: HttpClientService) {}

  usersData = new BehaviorSubject<any[]>([]);
  usersList$ = this.usersData.asObservable();

  getAllUsers() {
    this.httpClientService.get('user').subscribe((res) => {
      if (res.statusCode === StatusCode.Success) {
        this.usersData.next(res.data);
      }
    });
  }

  getUserById(userId: number) {
    return this.httpClientService.get('user', userId);
  }

  changeUserStatus(userId: number, status: string) {
    const route = `user/${userId}/change-status`;
    const params = {
      status: status,
    };
    this.httpClientService.post(route, params).subscribe((res) => {
      if (res.statusCode === StatusCode.NotFound) {
        console.log(res.message);
      }
      if (res.statusCode === StatusCode.Success) {
        console.log(res.message);
      }
    });
  }
}
