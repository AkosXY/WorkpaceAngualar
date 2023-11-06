import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskGridComponent } from "../task-grid.component";
import { FormControl } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";
import { WorkerService } from "src/app/serivces/worker.service";
import { Worker } from 'src/app/interface/worker.interface';

@Component({
  selector: 'assign-task-dialog',
  templateUrl: 'assign-task-dialog.component.html',
  styleUrls: ['./assign-task-dialog.component.css'],

})
export class AssignTaskDialogComponent {
  constructor(private dialogRef: MatDialogRef<TaskGridComponent>, private workerService: WorkerService) { }

  assignForm = new FormControl('');
  options: Worker[] = [];
  selectedId: number | undefined;
  filteredOptions: Observable<Worker[]> | undefined;

  ngOnInit() {
    this.initOptions()
    this.filteredOptions = this.assignForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  initOptions() {
    this.workerService.getMyWorkers().subscribe((resp) => {
      this.options = resp;
      this.assignForm.reset();
      console.log(resp)
    });
  }

  private _filter(value: string): Worker[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(options => options.name.toLowerCase().includes(filterValue));
  }

  select() {
    this.dialogRef.close(this.assignForm.value !== "" ? this.selectedId : undefined);
  }


}