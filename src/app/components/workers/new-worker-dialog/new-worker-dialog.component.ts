import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'login-dialog',
    templateUrl: 'new-worker-dialog.component.html',
    styleUrls: ['./new-worker-dialog.component.css'],

  })
  export class NewWorkerDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public permission: any) {}

    ngOnInit() {
        console.log('Received data:', this.permission);
      }

      submitForm = new FormGroup({
        nameForm: new FormControl('', [Validators.required]),
        usernameForm: new FormControl('', [Validators.required]),
        phoneForm: new FormControl('', [Validators.required]),
        emailForm: new FormControl('', [Validators.required]),
        enabledForm: new FormControl(false)
        
/*         ,
        passwordForm: new FormControl('', [Validators.required, Validators.minLength(5)]) */
      })

      get nameForm() {
        return this.submitForm.get('nameForm');
      }
    

      get usernameForm() {
        return this.submitForm.get('usernameForm');
      }
    
      get phoneForm() {
        return this.submitForm.get('phoneForm');
      }
    
    
      get emailForm() {
        return this.submitForm.get('emailForm');
      }

      get enabledForm() {
        return this.submitForm.get('enabledForm');
      }
          
/*       get passwordForm() {
        return this.submitForm.get('passwordForm');
      } */
  
    
  }