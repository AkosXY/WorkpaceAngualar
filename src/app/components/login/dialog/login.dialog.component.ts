import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'login-dialog',
    templateUrl: 'login.dialog.component.html',
    styleUrls: ['./login.dialog.component.css'],

  })
  export class LoginDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public permission: any) {}

    ngOnInit() {
        console.log('Received data:', this.permission);
      }
    
  }