import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { StatusCode } from '../../../core/utilities/buspay.enums';

@Injectable({
  providedIn: 'root',
})
export class RoutesStopsService {
  constructor(private httpClientService: HttpClientService) {}

  getAllStops() {
    this.httpClientService.get('stop').subscribe((res) => {
      if (res.statusCode === StatusCode.Success) {
        console.log(res.data);
      }
    });
  }

  getAllRoutes() {
    this.httpClientService.get('route').subscribe((res) => {
      if (res.statusCode === StatusCode.Success) {
        console.log(res.data);
      }
    });
  }
}
