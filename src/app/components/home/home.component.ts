import { Component } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Entity } from '../../interfaces/entity';
import { DataService } from '../../services/data.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  data: DataService;

  constructor(data: DataService) {
    this.data = data;
    this.dataSource = new MatTableDataSource(this.data.Subjects.getAll());
  }

  displayedColumns: string[] = ['name', 'dob', 'social', 'opid', 'uuid'];
  
  dataSource: MatTableDataSource<Entity>;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

