import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/serivces/feedback.service';
import { MessageDialogComponent } from '../dialog/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  constructor(private feedbackService: FeedbackService, private dialog: MatDialog) { }

  submitForm = new FormGroup({
    feedbackForm: new FormControl('', [Validators.required])
  })



  submit() {
    if (this.feedbackForm?.valid) {
      const feedback = {
        text: this.feedbackForm?.value,
      }

      this.feedbackService.sendFeedback(feedback).subscribe((success) => {
        console.log(success)
        if(success){
          this.dialog.open(MessageDialogComponent, {
            data: 'Thank you for your feedback! 🚀 We appreciate your time and contribution.'
          });
        } else{
          this.dialog.open(MessageDialogComponent, {
            data: "We're sorry, but something went wrong while submitting your feedback. Please try again later. If the issue persists, feel free to contact our support team."
          });
        }
      });

    }
  }

  get feedbackForm() {
    return this.submitForm.get('feedbackForm');
  }

}


