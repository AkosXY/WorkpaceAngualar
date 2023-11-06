import { Component } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/serivces/authentication.service";
import { TaskGridComponent } from "../task-grid.component";
import { TaskService } from "src/app/serivces/task.service";
import { MatSliderChange } from "@angular/material/slider";


@Component({
  selector: 'new-task-dialog',
  templateUrl: 'new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],

})
export class NewTaskDialogComponent {

  defaultLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Icon_Notes.svg/640px-Icon_Notes.svg.png"
  constructor(private auth: AuthenticationService, private taskService: TaskService, private dialogRef: MatDialogRef<TaskGridComponent>) {}


  submitForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
    commentForm: new FormControl(''),
    timeForm: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]),
    imageForm: new FormControl(''), //,[Validators.required, Validators.pattern(/^(http(s?):\/\/).+(\.(jpeg|jpg|png|gif|bmp))$/i)]
    descriptionForm: new FormControl(''),
  })

  
  numOfPictures: number = 0; 



  submit() {
    if (this.submitForm.valid) {
      console.log(this.getCurrentDate())


      const task = {
        name: this.nameForm?.value,
        comment: this.commentForm?.value,
        state: "UNASSIGNED",
        supervisor_id: this.auth.getUserData().id,
        assignee_id: null, 
        due_date: null, //TODO calendar
        time_target: this.timeForm?.value, 
        location_id: 1, //TODO mi ez?
        logo: this.isUrlValid(this.imageForm?.value) ? this.imageForm?.value : this.defaultLogo, 
        image_available: false, 
        image_number: this.numOfPictures, 
        time_started: null,
        time_finished: null,
        creation_dttm: this.getCurrentDate()
      }

      this.taskService.createTask(task).subscribe((success) => {
        if (success) {
          this.dialogRef.close('refresh')
        }
      });
    }
  }



  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  isUrlValid(url: any) {
    /* const pattern = /^(http(s?):\/\/).+(\.(jpeg|jpg|png|gif|bmp))$/i; */
    const pattern = /^(http(s?):\/\/).+$/i;
    if (pattern.test(url)) {
      return true
    } else {
      return false
    }
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

  get imageForm() {
    return this.submitForm.get('imageForm');
  }


}