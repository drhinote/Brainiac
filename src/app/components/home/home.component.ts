import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Entity } from '../../interfaces/entity';
import { DataService } from '../../services/data.service';
import { HandsetService } from '../../services/handset.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  handset: any;
  selected: Entity;
  showall: boolean;
  searchValue: string;

  constructor(private data: DataService, private dialog: MatDialog, ) {
    this.handset = new HandsetService();  
  }

  addSubject(): void {
    const dialogRef = this.dialog.open(SubjectComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selected = result;
      this.applyFilter(this.selected['UuId']);
    });
  }

   editSubject(): void {
    const dialogRef = this.dialog.open(SubjectComponent, {
      width: '250px',
      data: this.selected
    });
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
     this.handset.data.init();
  }

  public selectSubject(subject: Entity) {
    this.selected = subject;
  }
}

