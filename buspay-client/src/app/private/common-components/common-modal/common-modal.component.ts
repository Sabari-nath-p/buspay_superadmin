import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModalService } from './common-modal.service';
import { ModalButton } from '../../../shared/models/common-modal.model';

@Component({
  selector: 'app-common-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-modal.component.html',
  styleUrl: './common-modal.component.scss',
})
export class CommonModalComponent {
  @ViewChild('commonModal') commonModal!: ElementRef<any>;
  @Input() isHeaderRequired: boolean = true;
  @Input() isFooterRequired: boolean = true;
  @Input() heading: string = '';
  @Input() content: any;
  @Input() buttons: ModalButton[] = [];

  @Output() buttonClick = new EventEmitter<string>();
  

  constructor(private modalService: CommonModalService) {}

  ngOnInit() {
    this.modalService.modalConfig$.subscribe((config) => {
      if (config) {
        this.heading = config.heading;
        this.content = config.content;
        this.isHeaderRequired = config.isHeaderRequired;
        this.isFooterRequired = config.isFooterRequired;
        this.setModalDimensions(config.width, config.height);
        this.buttons = config.buttons ?? [];
        this.showModal();
      } else {
        this.hideModal();
      }
    });
  }

  showModal() {
    if (this.commonModal?.nativeElement) {
      const modal = this.commonModal.nativeElement;
      modal.style.display = 'block';
    }
  }

  hideModal() {
    if (this.commonModal?.nativeElement) {
      const modal = this.commonModal?.nativeElement;
      modal.style.display = 'none';
    }
  }

  setModalDimensions(width?: string, height?: string) {
    if (this.commonModal?.nativeElement) {
      const modalDialog = this.commonModal.nativeElement.querySelector('.modal-dialog');
      const modalContent = this.commonModal.nativeElement.querySelector('.modal-content');
      
      if (width) {
        modalDialog.style.maxWidth = width;
        modalDialog.style.width = width;
      }
      
      if (height) {
        modalContent.style.height = height;
        // Make modal body take remaining height
        const modalBody = modalContent.querySelector('.modal-body');
        if (modalBody) {
          modalBody.style.height = 'calc(100% - ' + 
            (this.isHeaderRequired ? '56px' : '0px') + ' - ' + 
            (this.isFooterRequired ? '57px' : '0px') + ')';
          modalBody.style.overflowY = 'auto';
        }
      }
    }
  }

  onButtonClick(button: ModalButton) {
    if (button.callback) {
      button.callback();
    }
  }

}
