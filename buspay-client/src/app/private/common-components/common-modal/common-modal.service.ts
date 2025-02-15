import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CommonModalService {
  private modalConfig = new BehaviorSubject<{
    heading: string;
    content: any;
    isHeaderRequired: boolean;
    isFooterRequired: boolean;
  } | null>(null);

  modalConfig$ = this.modalConfig.asObservable();

  showModal(config: {
    heading: string;
    content: any;
    isHeaderRequired?: boolean;
    isFooterRequired?: boolean;
  }) {
    this.modalConfig.next({
      heading: config.heading,
      content: config.content,
      isHeaderRequired: config.isHeaderRequired ? true : false,
      isFooterRequired: config.isFooterRequired ? true : false,
    });
  }

  hideModal() {
    this.modalConfig.next(null);
  }
}
