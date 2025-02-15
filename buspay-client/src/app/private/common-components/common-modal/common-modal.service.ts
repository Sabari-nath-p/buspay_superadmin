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
    width?: string;
    height?: string;
  } | null>(null);

  modalConfig$ = this.modalConfig.asObservable();

  showModal(config: {
    heading: string;
    content: any;
    isHeaderRequired?: boolean;
    isFooterRequired?: boolean;
    width?: string;
    height?: string;
  }) {
    this.modalConfig.next({
      heading: config.heading,
      content: config.content,
      isHeaderRequired: config.isHeaderRequired ? true : false,
      isFooterRequired: config.isFooterRequired ? true : false,
      width: config.width,
      height: config.height
    });
  }

  hideModal() {
    this.modalConfig.next(null);
  }
}
