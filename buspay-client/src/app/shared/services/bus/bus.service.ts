import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusCode } from '../../../core/utilities/buspay.enums';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  busTypeData = new BehaviorSubject<any>([]);
  busTypes$ = this.busTypeData.asObservable();

  constructor(private httpClientService: HttpClientService) {}

  getAllBusTypes(): any {
    this.httpClientService.get('bus-type').subscribe({
      next: (res) => {
        if (res.statusCode === StatusCode.Success) {
          this.busTypeData.next(res.data);
        } else {
          this.busTypeData.next([]);
        }
      },
      error: (err) => this.busTypeData.next([]),
    });
  }

  createBusType(busTypeData: any): any {
    return this.httpClientService.post('bus-type', busTypeData);
  }

  deleteBusType(busTypeId: number): any {
    return this.httpClientService.delete('bus-type', busTypeId)
  }
}
