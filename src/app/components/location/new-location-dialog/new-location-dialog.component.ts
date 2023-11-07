import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { LocationService } from "src/app/serivces/location.service";
import { LocationComponent } from "../location.component";

@Component({
  selector: 'new-location-dialog',
  templateUrl: 'new-location-dialog.component.html',
  styleUrls: ['./new-location-dialog.component.css'],

})
export class NewLocationDialogComponent {
  constructor(private locationService: LocationService, private dialogRef: MatDialogRef<LocationComponent>) { }

  submitForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
    addressForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
    latitudeForm: new FormControl('', [Validators.required]),
    longitudeForm: new FormControl('', [Validators.required]),
    radiusForm: new FormControl(60)
  })

  submit() {
    if (this.submitForm.valid) {
      console.log("submited");
      const location = {
        display_name: this.nameForm?.value,
        address: this.addressForm?.value,
        latitude: this.latitudeForm?.value,
        longitude: this.longitudeForm?.value,
        radius: this.radiusForm?.value,
      }

      this.locationService.saveLocation(location).subscribe((success) => {
        if (success) {
          this.dialogRef.close('refresh')
        }
      });
    }
  }

  get nameForm() {
    return this.submitForm.get('nameForm');
  }

  get addressForm() {
    return this.submitForm.get('addressForm');
  }

  get latitudeForm() {
    return this.submitForm.get('latitudeForm');
  }

  get longitudeForm() {
    return this.submitForm.get('longitudeForm');
  }

  get radiusForm() {
    return this.submitForm.get('radiusForm');
  }

}