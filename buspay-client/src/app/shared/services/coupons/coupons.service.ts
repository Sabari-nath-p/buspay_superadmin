import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StatusCode } from '../../../core/utilities/buspay.enums';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  couponsData = new BehaviorSubject<any>([]);
  couponsList$ = this.couponsData.asObservable();

  constructor(private httpClientService: HttpClientService) {}

  getAllCoupons(): any {
    this.httpClientService.get('').subscribe({
      next: (res) => {
        if (res.statusCode === StatusCode.Success) {
          this.couponsData.next(res.data);
        } else {
          this.couponsData.next([]);
        }
      },
      error: (err) => this.couponsData.next([]),
    });
  }

  addCoupon(couponData: any): Observable<any> {
    return this.httpClientService.post('', couponData);
  }

  updateCoupon(couponId: any, couponData: any): Observable<any> {
    return this.httpClientService.updatePatch('', couponId, couponData);
  }

  deleteCoupon(couponId: any): Observable<any> {
    return this.httpClientService.delete('', couponId);
  }
}
