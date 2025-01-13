import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModalComponent } from './private/common-components/common-modal/common-modal.component';
import { CommonModalService } from './private/common-components/common-modal/common-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'buspay-client';
  @ViewChild('sample') sample!: TemplateRef<any>;

  constructor(private modalService: CommonModalService) {}

  onClick() {
    this.modalService.showModal({
      heading: 'Dynamic Modal',
      content: this.sample,
      isHeaderRequired: true,
      isFooterRequired: true,
    });
  }
}
