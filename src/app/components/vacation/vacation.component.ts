import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { Vacation } from 'src/app/models/Vacation';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss']
})
export class VacationComponent implements OnInit {

  columnNames = ['CreatedDate','StartDate','EndDate','Name','Description','ImageSource'];

  dataSource: MatTableDataSource<Vacation>

  constructor(private _vacationService: VacationService) { }

  ngOnInit() {
    this._vacationService.getVacationsByUser().subscribe((vacations: Vacation[]) => {
      this.dataSource = new MatTableDataSource<Vacation>(vacations);
    });
    
  }

}
