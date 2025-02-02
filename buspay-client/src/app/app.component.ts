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

  // Row Data: The data to be displayed.
  rowData = [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ];

    // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { field: "make" ,headerName: "MAKE",filter:true},
    { field: "model" ,filter:true},
    { field: "price",cellRenderer:(item: any)=>{ 
      return `$${item.value}`
    },filter:true ,editable:true},
    { field: "electric" },
  ];
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
