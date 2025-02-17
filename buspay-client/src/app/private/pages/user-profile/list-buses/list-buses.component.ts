import { Component, Input } from '@angular/core';
import { BusService } from '../../../../shared/services/bus/bus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-buses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-buses.component.html',
  styleUrl: './list-buses.component.scss',
})
export class ListBusesComponent {
  @Input() ownerId: number = 0;

  busList: any = [];

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.getBusesByOwnerId(this.ownerId);
  }

  getBusesByOwnerId(ownerId: number): void {
    this.busService.getAllBusDetails().subscribe((res: any) => {
      if (res.status) {
        this.busList = res.data.filter((bus: any) => bus.owner_id === ownerId);
        // if (this.busList && this.busList.bus_type_id) {
        //   this.busService
        //     .getBusTypeById(this.busList.bus_type_id)
        //     .subscribe((busType: any) => {
        //       if (busType.data) {
        //         this.busList.push({ bus_type: busType.type });
        //       }
        //       console.log(this.busList);
        //     });
        // }
        this.getBustype();
      }
    });
  }

  getBustype() {
    if (this.busList) {
      this.busList.map((x: any) => {
        if (x.bus_type_id) {
          this.busService
            .getBusTypeById(x.bus_type_id)
            .subscribe((busType: any) => {
              if (busType.data) {
                x.bus_type = busType.data.type;
              }
              console.log(this.busList);
            });
        }
      });
    }
  }
}
