import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { Place } from 'src/app/interface/place.interface';

@Component({
  selector: 'app-autocomplete-place',
  templateUrl: './autocomplete-place.component.html',
  styleUrls: ['./autocomplete-place.component.css']
})
export class AutocompletePlaceComponent {
  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined


  @Output() placeChanged = new EventEmitter<Place>()

  constructor(private ngZone: NgZone){}


  ngAfterViewInit(){
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement, {fields: ["formatted_address", "geometry", "name"] })
    this.autocomplete.setFields(['address_component', 'geometry']);


    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace()
      const placeResult : Place = {
        address: this.inputField.nativeElement.value,
        lat: place?.geometry?.location?.toJSON().lat,
        lng: place?.geometry?.location?.toJSON().lng
      }
      console.log(placeResult)

      this.ngZone.run(()=>{
        this.placeChanged.emit(placeResult)
      })
    })
  }

}
