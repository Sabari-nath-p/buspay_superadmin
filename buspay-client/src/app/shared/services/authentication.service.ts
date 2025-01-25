import { Injectable } from '@angular/core';
import { HttpClientService } from '../../core/services/http-client/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClientService: HttpClientService) {}

  login(params: any) {
    return this.httpClientService.post('auth/login', params);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  logout() {
    localStorage.clear();
  }
}
