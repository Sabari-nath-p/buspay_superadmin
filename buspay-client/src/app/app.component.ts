import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './private/common-components/side-bar/side-bar.component';
import { AnalyticsCardComponent } from './private/common-components/analytics-card/analytics-card.component';
import { IconsLibraryComponent } from './private/common-components/svg-icons/icons-library/icons-library.component';
import { CommonModalComponent } from './private/common-components/common-modal/common-modal.component';
import { CommonModalService } from './private/common-components/common-modal/common-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    AnalyticsCardComponent,
    IconsLibraryComponent,
    CommonModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'buspay-client';
  // @ViewChild('sample') sample!: TemplateRef<any>;

  // constructor(private modalService: CommonModalService) {}

  // onClick() {
  //   this.modalService.showModal({
  //     heading: 'Dynamic Modal',
  //     content: this.sample,
  //     isHeaderRequired: true,
  //     isFooterRequired: true,
  //   });
  // }
}
