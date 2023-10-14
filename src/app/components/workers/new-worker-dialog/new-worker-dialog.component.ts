import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/serivces/authentication.service";
import { WorkerService } from "src/app/serivces/worker.service";
import { WorkersComponent } from "../workers.component";

@Component({
    selector: 'login-dialog',
    templateUrl: 'new-worker-dialog.component.html',
    styleUrls: ['./new-worker-dialog.component.css'],

  })
  export class NewWorkerDialogComponent {
    constructor( private auth: AuthenticationService, private workerService: WorkerService, private dialogRef: MatDialogRef<WorkersComponent>) {}

      submitForm = new FormGroup({
        nameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
        usernameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
        phoneForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
        emailForm: new FormControl('', [Validators.required, Validators.email]),
        enabledForm: new FormControl(false),
        adminForm: new FormControl(false)
   })

      submit(){
        if(this.submitForm.valid){
          console.log("submited");
          const worker = {
            name: this.nameForm?.value,
            username: this.usernameForm?.value, 
            phone: this.phoneForm?.value,
            email: this.emailForm?.value,
            enabled: this.enabledForm?.value,
            admin: this.adminForm?.value,
            password:"new",
            supervisorId: this.auth.getUserData().id
          }

          this.workerService.postNewWorker(worker).subscribe((success) => {
            if(success){
              this.dialogRef.close('refresh')
            }
          });
        } 
      }

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

      get adminForm() {
        return this.submitForm.get('adminForm');
      }

    
  }