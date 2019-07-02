import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Entity } from '../../interfaces/entity';
import { DataService } from '../../services/data.service';
import { HandsetService } from '../../services/handset.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: DataService;
  public handset: HandsetService;
  selected: Entity;

  constructor(data: DataService, handset: HandsetService) {
    this.data = data;    
    this.handset = handset;
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

  public selectSubject(subject: Entity) {
    this.selected = subject;
  }
}

