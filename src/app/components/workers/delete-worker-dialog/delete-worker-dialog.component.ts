import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/serivces/authentication.service";
import { WorkerService } from "src/app/serivces/worker.service";
import { WorkersComponent } from "../workers.component";

@Component({
    selector: 'delete-worker-dialog',
    templateUrl: 'delete-worker-dialog.component.html',
    styleUrls: ['./delete-worker-dialog.component.css'],

  })
export class DeleteWorkerDialogComponent {
  constructor( private auth: AuthenticationService, private workerService: WorkerService, private dialogRef: MatDialogRef<WorkersComponent>) {}

  comfirm(){
    this.dialogRef.close('comfirmed')
  }
  
}