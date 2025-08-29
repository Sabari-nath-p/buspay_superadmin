import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private httpClientService: HttpClientService) { }

  getBusOwnerAnalyticsById(userId:any):Observable<any>{
    const route = `dashboard/bus-owner-analytics?bus_owner_id=${userId}`
    return this.httpClientService.get(route)
  }
}
