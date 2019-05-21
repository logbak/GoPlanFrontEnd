import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { Vacation } from 'src/app/models/Vacation';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-myvacations',
  templateUrl: './myvacations.component.html',
  styleUrls: ['./myvacations.component.scss']
})
export class MyvacationsComponent implements OnInit {

    columnNames = ['Edit','StartDate','EndDate','Name','Description','ImageSource'];

    dataSource: MatTableDataSource<Vacation>
  
    constructor(private _vacationService: VacationService) { }
  
    ngOnInit() {
      this._vacationService.getVacationsByUser().subscribe((vacations: Vacation[]) => {
        this.dataSource = new MatTableDataSource<Vacation>(vacations);
      });
      console.log(this.dataSource);
    }
}
