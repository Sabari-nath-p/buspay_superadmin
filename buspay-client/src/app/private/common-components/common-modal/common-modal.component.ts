import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModalService } from './common-modal.service';

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

  constructor(private modalService: CommonModalService) {}

  ngOnInit() {
    this.modalService.modalConfig$.subscribe((config) => {
      if (config) {
        this.heading = config.heading;
        this.content = config.content;
        this.isHeaderRequired = config.isHeaderRequired;
        this.isFooterRequired = config.isFooterRequired;
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
}
