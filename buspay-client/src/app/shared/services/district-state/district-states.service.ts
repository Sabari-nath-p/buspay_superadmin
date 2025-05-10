import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { StatusCode } from '../../../core/utilities/buspay.enums';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictStatesService {
  districtsData = new BehaviorSubject<any>([]);
  districts$ = this.districtsData.asObservable();

  constructor(private httpClientService: HttpClientService) {}

  getAllDistricts(): any {
    this.httpClientService.get('districts').subscribe({
      next: (res) => {
        if (res.statusCode === StatusCode.Success) {
          console.log(this.districtsData)
          this.districtsData.next(res.data);
          console.log(this.districtsData)
        } else {
          this.districtsData.next([]);
        }
      },
      error: (err) => this.districtsData.next([]),
    });
  }
}
