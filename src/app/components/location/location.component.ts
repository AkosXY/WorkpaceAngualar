import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { LocationService } from 'src/app/serivces/location.service';
import { Location } from 'src/app/interface/location.interface';
import { NewLocationDialogComponent } from './new-location-dialog/new-location-dialog.component';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  constructor(private dialog: MatDialog, private auth: AuthenticationService, private locationService: LocationService) {
    this.initTable();
  }

  locationList!: Location[];
  dataSource: any
  displayedColumns = ["display_name", "address", "action"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "fit-content";
    const dialogRef = this.dialog.open(NewLocationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.fetchLocationList();
      }
    });
  };

  fetchLocationList() {
    this.locationService.getLocations().subscribe((resp) => {
      this.locationList = resp;
      this.dataSource.data = this.locationList;
    });
  }

  initTable(){
    this.locationService.getLocations().subscribe((resp) => {
      this.locationList = resp;
      console.log(this.locationList)
      this.dataSource = new MatTableDataSource<Location>(this.locationList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteLocation(location: Location){

  }


}


