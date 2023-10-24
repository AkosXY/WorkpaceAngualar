import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {  MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/serivces/authentication.service";
import { TaskGridComponent } from "../task-grid.component";
import { TaskService } from "src/app/serivces/task.service";

@Component({
    selector: 'new-task-dialog',
    templateUrl: 'new-task-dialog.component.html',
    styleUrls: ['./new-task-dialog.component.css'],

  })
  export class NewTaskDialogComponent {
    constructor( private auth: AuthenticationService, private taskService: TaskService, private dialogRef: MatDialogRef<TaskGridComponent>) {}

      submitForm = new FormGroup({
        nameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
        commentForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
        timeForm: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]),

   })

  submit(){
    if(this.submitForm.valid){
    console.log(this.getCurrentDate())
      
      const task = {
        name: this.nameForm?.value,
        comment: this.commentForm?.value,
        state: "ASSIGNED",//TODO dropdown
        supervisor_id: this.auth.getUserData().id,
        assignee_id: 4, //TODO dropdown
        due_date: null, //TODO calendar
        time_target: null, //TODO calendar
        location_id: 1, //TODO mi ez?
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png", //TODO ezt hogyan töltsük fel?
        image_available: false, //TODO ez kell?
        image_number: null, //TODO nulla?
        time_started: null,
        time_finished: null,
        creation_dttm: this.getCurrentDate()
      }

      this.taskService.createTask(task).subscribe((success) => {
        if(success){
          this.dialogRef.close('refresh')
        }
      });
    } 
  }

  getCurrentDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  get nameForm() {
    return this.submitForm.get('nameForm');
  }

  get commentForm() {
    return this.submitForm.get('commentForm');
  }

  get timeForm() {
    return this.submitForm.get('timeForm');
  }



    
  }