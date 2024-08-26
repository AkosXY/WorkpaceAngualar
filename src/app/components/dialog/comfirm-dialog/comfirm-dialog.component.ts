import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'comfirm-dialog',
    templateUrl: 'comfirm-dialog.component.html',
    styleUrls: ['./comfirm-dialog.component.css'],

  })
export class ComfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public text: any, private dialogRef: MatDialogRef<any>) {}

  comfirm(){
    this.dialogRef.close('comfirmed')
  }
  
}