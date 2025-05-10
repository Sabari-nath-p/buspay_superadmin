import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  constructor() {}

  setMasterData(data: any) {
    localStorage.setItem('masterData', JSON.stringify(data));
  }
}
