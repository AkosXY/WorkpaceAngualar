import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { WorkersComponent } from "../workers.component";

@Component({
    selector: 'delete-worker-dialog',
    templateUrl: 'delete-worker-dialog.component.html',
    styleUrls: ['./delete-worker-dialog.component.css'],

  })
export class DeleteWorkerDialogComponent {
  constructor(private dialogRef: MatDialogRef<WorkersComponent>) {}

  comfirm(){
    this.dialogRef.close('comfirmed')
  }
  
}