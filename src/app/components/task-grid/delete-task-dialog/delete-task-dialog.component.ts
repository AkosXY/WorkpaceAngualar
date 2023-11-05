import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskGridComponent } from "../task-grid.component";

@Component({
    selector: 'delete-task-dialog',
    templateUrl: 'delete-task-dialog.component.html',
    styleUrls: ['./delete-task-dialog.component.css'],

  })
export class DeleteTaskDialogComponent {
  constructor(private dialogRef: MatDialogRef<TaskGridComponent>) {}

  comfirm(){
    this.dialogRef.close('comfirmed')
  }
  
}