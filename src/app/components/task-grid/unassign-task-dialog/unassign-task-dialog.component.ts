import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskGridComponent } from "../task-grid.component";

@Component({
    selector: 'unassign-task-dialog',
    templateUrl: 'unassign-task-dialog.component.html',
    styleUrls: ['./unassign-task-dialog.component.css'],

  })
export class UnAssignTaskDialogComponent {
  constructor(private dialogRef: MatDialogRef<TaskGridComponent>) {}

  comfirm(){
    this.dialogRef.close('comfirmed')
  }
  
}