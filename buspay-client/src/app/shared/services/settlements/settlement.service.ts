import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private httpClientService: HttpClientService) { }

  getAllSettlementRequests(){
    this.httpClientService.get('settle-requests').subscribe((res)=>{
      console.log(res)
    })
  }

  

}
