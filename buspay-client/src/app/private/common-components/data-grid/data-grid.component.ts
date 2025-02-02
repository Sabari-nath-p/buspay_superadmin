import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent {
  @Input() rowData: any;
  @Input() colDefs!: ColDef[];
  @Input() isExported: boolean = false;
  @Input() exportLabel: string = 'EXPORT';
  @Input() pagination: boolean = false;
  @Input() paginationPageSizeSelector: any[] = [5, 10, 100];

  private gridApi!: GridApi<any>;

  constructor() {}

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  onGridReady(event: GridReadyEvent<any>): void {
    this.gridApi = event.api;
  }

  onExportClick() {
    this.gridApi.exportDataAsCsv();
  }
}
