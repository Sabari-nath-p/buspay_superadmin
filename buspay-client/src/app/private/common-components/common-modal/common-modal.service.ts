import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalButton } from '../../../shared/models/common-modal.model';

@Injectable({
  providedIn: 'root',
})
export class CommonModalService {

  private modalButtonClickSource = new BehaviorSubject<any>(null);
  modalButtonClick$ = this.modalButtonClickSource.asObservable();

  onHideModal = new BehaviorSubject<any>(false);
  hideModalSubject$ = this.onHideModal.asObservable();

  private modalOpen = false;

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
    this.modalOpen = true
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
    
    this.modalOpen = false;
    if (this.modalConfig.getValue() !== null) {
      this.modalConfig.next(null); 
      this.onHideModal.next(true)
    }
  }

  isModalOpen(): boolean {
    return this.modalOpen;
  }
  
}
