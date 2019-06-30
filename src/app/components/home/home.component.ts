import { Component } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Entity } from '../../interfaces/entity';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
sortedData: Entity[];
data: DataService;
sort: Sort;
  constructor(data: DataService) {
    this.data = data;
    this.sortedData = [];
  }

  sortData(sort: Sort, name: string, dob: string, social: string, opid: string, uuid: string) {
    const data = this.data.Subjects.getAll().filter(s => new String(s['Name']).indexOf(name) >= 0);
    if(sort) this.sort = sort;

    if(!this.sort) {
       this.sort = { active: "name", direction: 'asc' };
    }
    
    if (!this.sort.active || this.sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a['Name'], b['Name'], isAsc);
        case 'dob': return compare(a['Dob'], b['Dob'], isAsc);
        case 'social': return compare(a['Social'], b['Social'], isAsc);
        case 'opid': return compare(a['OpId'], b['OpId'], isAsc);
        case 'uuid': return compare(a['UuId'], b['UuId'], isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}