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
  constructor(private locationService: LocationService, private dialogRef: MatDialogRef<LocationComponent>) { 
   /*  this.submitForm.get('latitudeForm')?.readonly();
    this.submitForm.get('longitudeForm')?.readonly(); */
  }

  submitForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
    addressForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
    latitudeForm: new FormControl('', [Validators.required]),
    longitudeForm: new FormControl('', [Validators.required]),
    radiusForm: new FormControl(60)
  })

  searchOptions: any = {
    componentRestrictions: { country: 'IN' }
  }  

  options: google.maps.MapOptions = {
    center: {lat: 47.4923, lng: 19.0433},
    zoom: 11
  };

  markerOptions: google.maps.MarkerOptions = {draggable: true};
  selection = {lat: 47.4923, lng: 19.0433}
  selected = false;


  addMarker(event: google.maps.MapMouseEvent) {
    if(this.selection){
      this.selection.lat = event.latLng?.toJSON().lat ? event.latLng?.toJSON().lat : this.selection.lat;
      this.selection.lng = event.latLng?.toJSON().lng ? event.latLng?.toJSON().lng : this.selection.lng;
      this.selected = true
      this.latitudeForm?.setValue(this.selection.lat.toString())
      this.longitudeForm?.setValue(this.selection.lng.toString())
      console.log(this.selection)
    }
  }
  onDragend(event:any){
    this.addMarker(event);
  }

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