import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  baseUrl = environment.config.baseUrl;
  constructor(private http: HttpClient) {}

  // Add the get, post, put, delete, upload methods here..
}
