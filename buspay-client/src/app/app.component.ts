import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataGridComponent } from './private/common-components/data-grid/data-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DataGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
}
