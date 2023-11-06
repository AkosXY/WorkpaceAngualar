import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskGridComponent } from "../task-grid.component";
import { TaskService } from "src/app/serivces/task.service";
import { Task } from "src/app/interface/task.interface";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Image } from "src/app/interface/image.interface";

@Component({
    selector: 'review-task-dialog',
    templateUrl: 'review-task-dialog.component.html',
    styleUrls: ['./review-task-dialog.component.css'],

  })
export class ReviewTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, private dialogRef: MatDialogRef<TaskGridComponent>, private taskService: TaskService ,private sanitizer: DomSanitizer) {}

  imageSource: Image[] = [];

  
  ngOnInit() {
    this.loadImages()
  }

  loadImages() {
    this.taskService.getImagesForTask(this.data).subscribe((resp) => {
      this.imageSource = resp
      console.log(this.imageSource)
    });
  }

  displayImage(image:Image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image.payload}`)
  }

  select(){
      this.dialogRef.close()
  }

}