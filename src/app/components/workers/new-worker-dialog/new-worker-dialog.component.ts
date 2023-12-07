import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/serivces/authentication.service";
import { WorkerService } from "src/app/serivces/worker.service";
import { WorkersComponent } from "../workers.component";
import * as bcrypt from 'bcryptjs';
import { NewUser } from "src/app/interface/user.interface";

@Component({
    selector: 'new-worker-dialog',
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
      const worker:NewUser = {
        username: this.usernameForm?.value || '',
        phone: this.phoneForm?.value || '',
        email: this.emailForm?.value || '',
        name: this.nameForm?.value || '',
        admin: this.adminForm?.value || false,
        enabled: this.enabledForm?.value || false,
        supervisorId: this.auth.getUserData().id,
        password: bcrypt.hashSync(this.usernameForm?.value || ''),
      }
      console.log(worker)

      this.auth.register(worker).subscribe((success) => {
        console.log("succ: "+success)
        if(success){
          this.dialogRef.close('refresh')
        }
      })

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