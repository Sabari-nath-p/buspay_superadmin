import { Injectable } from '@angular/core';
import { HttpClientService } from '../../core/services/http-client/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClientService: HttpClientService) {}

  login(params: any) {
    this.httpClientService.post('auth/login', params).subscribe((response) => {
      console.log(response);
      if (response.tokens && response.tokens.accessToken) {
        // console.log('AccessToken : ', response.tokens.accessToken);
      }
    });
  }
}
