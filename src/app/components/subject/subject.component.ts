import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { Entity } from '../../interfaces/entity';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function roid() {
    return 'xxx-yyyy'.replace(/[xy]/g, function(c) {
    return c == 'x' ? letters.charAt(Math.floor(Math.random() * 26)) : Math.floor(Math.random() * 10).toString();
   });
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  constructor( public dialogRef: MatDialogRef<SubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Entity, public db: DataService) {
     
     }

  cancel(): void {
    this.dialogRef.close();
  }

  ok(): void {
    this.dialogRef.close();
    if(!this.data['UuId']) {
      this.data.Id = uuidv4();
      this.data['UuId'] = roid();
    }
    this.db.Subjects.addOrUpdate(this.data);
  }

}