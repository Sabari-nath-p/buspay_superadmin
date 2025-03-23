import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettlementService {
  constructor(private httpClientService: HttpClientService) {}

  getAllSettlementRequests(): Observable<any> {
    return this.httpClientService.get('settle-requests');
  }

  getAllSettlementRequestsByUserId(userId: any): Observable<any> {
    const route = `settle-requests?user_id=${userId}`;
    return this.httpClientService.get(route);
  }
}
