import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalButton } from '../../../shared/models/common-modal.model';

@Injectable({
  providedIn: 'root',
})
export class CommonModalService {

  private modalButtonClickSource = new BehaviorSubject<any>(null);
  modalButtonClick$ = this.modalButtonClickSource.asObservable();

  emitButtonClick(id: string) {
    this.modalButtonClickSource.next(id);

    // setTimeout(() => {
    //   this.modalButtonClickSource.next('');
    // }, 100);
  }

  private modalConfig = new BehaviorSubject<{
    heading: string;
    content: any;
    isHeaderRequired: boolean;
    isFooterRequired: boolean;
    width?: string;
    height?: string;
    buttons?: ModalButton[];
  } | null>(null);

  modalConfig$ = this.modalConfig.asObservable();

  showModal(config: {
    heading: string;
    content: any;
    isHeaderRequired?: boolean;
    isFooterRequired?: boolean;
    width?: string;
    height?: string;
    buttons?: ModalButton[];
  }) {
    this.modalConfig.next({
      heading: config.heading,
      content: config.content,
      isHeaderRequired: config.isHeaderRequired ? true : false,
      isFooterRequired: config.isFooterRequired ? true : false,
      width: config.width,
      height: config.height,
      buttons: config.buttons ?? [],
    });
  }

  hideModal() {
    this.modalConfig.next(null);
  }
}
