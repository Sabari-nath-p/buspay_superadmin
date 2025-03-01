import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { StatusCode } from '../../../core/utilities/buspay.enums';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

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

  getBusOwners(): Observable<any> {
    const route = 'user?role=bus_owner';

    return this.httpClientService.get(route);
  }
  getUserById(userId: number) {
    return this.httpClientService.get('user', userId);
  }

  changeUserStatus(userId: number, status: string): Observable<any> {
    const route = `user/${userId}/change-status`;
    const params = {
      status: status,
    };
    return this.httpClientService.post(route, params);
  }

  changeSettlementStatus(userId: number, status: string): Observable<any> {
    const route = `settle-requests/${userId}/change-status`;
    const params = {
      status: status,
    };
    return this.httpClientService.post(route, params);
  }

  getConductorsByBusOwnerId(busOwnerId: any): Observable<any> {
    const route = `user/list-conductors?bus_owner_id=${busOwnerId}`;
    // `dashboard/bus-owner-analytics?bus_owner_id=${userId}`
    return this.httpClientService.get(route);
  }
}
