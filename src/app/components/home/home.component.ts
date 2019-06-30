import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Entity } from '../../interfaces/entity';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: DataService;

  constructor(data: DataService) {
    this.data = data;
    
  }

  displayedColumns: string[] = ['Name', 'Dob', 'Social', 'OpId', 'UuId'];
  
  dataSource: MatTableDataSource<Entity>;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.Subjects.getAll());
    this.dataSource.sort = this.sort;
  }
}

