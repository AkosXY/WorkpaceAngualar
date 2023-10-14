import { Component, ViewChild } from '@angular/core';
import { WorkerService } from 'src/app/serivces/worker.service';
import { Worker } from 'src/app/interface/worker.interface';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewWorkerDialogComponent } from './new-worker-dialog/new-worker-dialog.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent {

  workerList!: Worker[];
  dataSource:any
  displayedColumns = ["name","username","email","phone","action"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private workerService: WorkerService, private auth: AuthenticationService, private dialog: MatDialog) {
    this.workerService.getMyWorkers().subscribe(resp => {
      this.workerList = resp
      this.dataSource = new MatTableDataSource<Worker>(this.workerList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(resp)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getAuth(){
    console.log(this.auth.getAuthHeader())
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "fit-content";
    this.dialog.open(NewWorkerDialogComponent, dialogConfig)
  };



}
