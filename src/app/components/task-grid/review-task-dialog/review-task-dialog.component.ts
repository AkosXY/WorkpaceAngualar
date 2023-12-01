import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskGridComponent } from "../task-grid.component";
import { TaskService } from "src/app/serivces/task.service";
import { Task } from "src/app/interface/task.interface";
import { DomSanitizer } from "@angular/platform-browser";
import { Image } from "src/app/interface/image.interface";

@Component({
  selector: 'review-task-dialog',
  templateUrl: 'review-task-dialog.component.html',
  styleUrls: ['./review-task-dialog.component.css'],

})
export class ReviewTaskDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, private dialogRef: MatDialogRef<TaskGridComponent>, private taskService: TaskService, private sanitizer: DomSanitizer) { }

  imageSource: Image[] = []
  currentIndex: number = 0
  pageStep = 4
  displayedImages: Image[] = []
  loadingImage = true

  feedbackText: string = ''

  ngOnInit() {
    this.loadImages()
  }

  loadImages() {
    this.taskService.getImagesForTask(this.data).subscribe((resp) => {
      this.imageSource = resp
      this.displayedImages = this.imageSource.slice(this.currentIndex, this.currentIndex + this.pageStep);
      this.loadingImage = false
      console.log(this.imageSource)
    });
  }

  displayImage(image: Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image.payload}`)
  }

  approve() {
    this.dialogRef.close({ option: 'approved' })
  }

  reject() {
    this.dialogRef.close({
      option: 'rejected',
      comment: this.feedbackText
    })
  }

  previousImages() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.pageStep;
      this.updateDisplayedImages();
    }
  }

  nextImages() {
    if (this.currentIndex + this.pageStep < this.imageSource.length) {
      this.currentIndex += this.pageStep;
      this.updateDisplayedImages();
    }
  }
  updateDisplayedImages() {
    this.displayedImages = this.imageSource.slice(this.currentIndex, this.currentIndex + this.pageStep);
  }


  previousDisabled() {
    return this.currentIndex === 0;
  }

  nextDisabled() {
    return this.currentIndex + this.pageStep >= this.imageSource.length;
  }

}