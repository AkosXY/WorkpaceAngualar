import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { WorkerService } from 'src/app/serivces/worker.service';
import { Worker } from 'src/app/interface/worker.interface';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewWorkerDialogComponent } from './new-worker-dialog/new-worker-dialog.component';
import { DeleteWorkerDialogComponent } from './delete-worker-dialog/delete-worker-dialog.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkersComponent {

  workerList!: Worker[];
  dataSource: any
  displayedColumns = ["name", "username", "email", "phone", "enabled"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hideInactive = false

  constructor(private workerService: WorkerService, private dialog: MatDialog, private cookieService: CookieService, private auth: AuthenticationService) {
    this.initHideInactive();
    this.initTable();
  }

  initTable(){
    this.workerService.getMyWorkers().subscribe((resp) => {
      this.workerList = this.hideInactive ? this.filterActiveRows(resp) : resp;
      this.dataSource = new MatTableDataSource<Worker>(this.workerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  fetchWorkerList() {
    this.workerService.getMyWorkers().subscribe((resp) => {
      this.workerList = this.hideInactive ? this.filterActiveRows(resp) : resp;
      this.dataSource.data = this.workerList;
    });
  }
  
  filterActiveRows(workerList: any) {
    return workerList.filter((row: { enabled: any; }) => !this.hideInactive || row.enabled);
  }

  onCheckboxChange() {
    this.cookieService.set('hideInactive', this.hideInactive? "true" : "false")
    this.fetchWorkerList()
  }

  initHideInactive() {
    this.hideInactive = this.cookieService.get('hideInactive') === "true";
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "fit-content";
    const dialogRef = this.dialog.open(NewWorkerDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.fetchWorkerList();
      }
    });
  };

  toggle(element: Worker) {
    element.enabled = !element.enabled;
    this.workerService.enableWorker(element).subscribe((resp) => {
    })
  }

  deleteWorker(worker: Worker) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteWorkerDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'comfirmed') {
        this.workerService.deleteWorker(worker.id).subscribe((succes) => {
          if (succes) {
            this.fetchWorkerList();
          }
        })
      }
    });
  }

  getAdminName(){
    return this.auth.getUserData().name
  }

}
