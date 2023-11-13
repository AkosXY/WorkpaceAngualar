import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task, TaskState } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/serivces/task.service';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { AssignTaskDialogComponent } from './assign-task-dialog/assign-task-dialog.component';
import { ReviewTaskDialogComponent } from './review-task-dialog/review-task-dialog.component';
import { ComfirmDialogComponent } from '../dialog/comfirm-dialog/comfirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TaskGridComponent {

  taskList!: Task[];
  dataSource: any;
  columnsToDisplay = ['name', 'state'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnNames: string[] = [
    'Name',
    'State',
    'Edit',
  ];
  expandedElement: Task | null | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private taskService: TaskService, private dialog: MatDialog, private router: Router) {
    const currentUrl = this.router.url;
    this.isPendingTasksPage = currentUrl.endsWith('/pending-tasks');
    this.initTable()
    //this.dataSource = this.CONST_DATA
  }

  isPendingTasksPage = false

  initTable() {
    this.taskService.getMyTasks().subscribe((resp) => {
      this.taskList = this.filterTaskList(resp.tasks)
      console.log(this.taskList)
      this.dataSource = new MatTableDataSource<Task>(this.taskList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  fetchData() {
    this.fetchMyTaskList()
  }


  fetchMyTaskList() {
    this.taskService.getMyTasks().subscribe((resp) => {
      this.taskList = this.filterTaskList(resp.tasks)
      this.dataSource.data = this.taskList
    });
  }

  fetchAllTaskList() {
    this.taskService.getAllTasks().subscribe((resp) => {
      this.taskList = resp
      this.dataSource.data = this.taskList

    });
  }

  filterTaskList(taskList: Task[]): Task[] {
    if (this.isPendingTasksPage) {
      return taskList.filter(task => ['UNASSIGNED', 'DONE', 'APPROVED'].includes(task.state));
    } else {
      return taskList;
    }
  }
  
  handleButtonContainerClick(event: Event): void {
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createNewTask() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.fetchData();
      }
    });

  }

  editTask(task: Task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "fit-content";
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: task
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.fetchData();
      }
    });

  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      data: 'Are you sure you want to delete this task?'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'comfirmed') {
        this.taskService.deleteTask(task.id).subscribe((success) => {
          if (success) {
            this.fetchData();
          }
        });
      }
    });
  }


  unassignTask(task: Task) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      data: 'Are you sure you want to unassign this task?'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'comfirmed') {
        this.taskService.unassignTask(task.id).subscribe((success) => {
          if (success) {
            this.fetchData();
          }
        })
      }
    });
  }

  assignWorker(task: Task) {
    const dialogRef = this.dialog.open(AssignTaskDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.assignTask(task.id, result).subscribe((success) => {
          if (success) {
            this.fetchData();
          }
        })
      }
    });
  }

  review(task: Task) {
    const dialogRef = this.dialog.open(ReviewTaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleReviewOutcome(task, result);
        console.log(result)
      }
    });
  }

  handleReviewOutcome(task: Task, action: string) {
    this.taskService[action === 'approved' ? 'approveTask' : 'rejectTask'](task).subscribe((success) => {
      if (success) {
        this.fetchData();
      }
    });
  }


  CONST_DATA = [
    {
      id: 2,
      name: "Meki pakolás234",
      comment: " A feladatok között szerepel az élelmiszerek és egyéb árucikkek a kamionról való biztonságos lerakodása és az étterem raktárába való elhelyezése.",
      state: TaskState.ASSIGNED,
      supervisor_id: 3,
      assignee_id: "7",
      due_date: new Date("2023-09-27"),
      time_target: 10,
      location_id: 9,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      image_available: false,
      image_number: null,
      time_started: null,
      time_finished: null,
      creation_dttm: new Date("2023-09-20"),
      display_name: "BME I Épület"
    },
    {
      id: 2,
      name: "Meki pakolás234",
      comment: " A feladatok között szerepel az élelmiszerek és egyéb árucikkek a kamionról való biztonságos lerakodása és az étterem raktárába való elhelyezése.",
      state: TaskState.ASSIGNED,
      supervisor_id: 3,
      assignee_id: null,
      due_date: new Date("2023-09-27"),
      time_target: 10,
      location_id: 9,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      image_available: false,
      image_number: null,
      time_started: null,
      time_finished: null,
      creation_dttm: new Date("2023-09-20"),
      display_name: "BME I Épület"
    },
    {
      id: 2,
      name: "Meki pakolás234",
      comment: " A feladatok között szerepel az élelmiszerek és egyéb árucikkek a kamionról való biztonságos lerakodása és az étterem raktárába való elhelyezése.",
      state: TaskState.ASSIGNED,
      supervisor_id: 3,
      assignee_id: "7",
      due_date: new Date("2023-09-27"),
      time_target: 10,
      location_id: 9,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      image_available: false,
      image_number: null,
      time_started: null,
      time_finished: null,
      creation_dttm: new Date("2023-09-20"),
      display_name: "BME I Épület"
    },
    {
      id: 2,
      name: "Meki pakolás234",
      comment: "hahaha",
      state: TaskState.ASSIGNED,
      supervisor_id: 3,
      assignee_id: "7",
      due_date: new Date("2023-09-27"),
      time_target: 10,
      location_id: 9,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      image_available: false,
      image_number: null,
      time_started: null,
      time_finished: null,
      creation_dttm: new Date("2023-09-20"),
      display_name: "BME I Épület"
    },
    {
      id: 2,
      name: "Meki pakolás234",
      comment: " A feladatok között szerepel az élelmiszerek és egyéb árucikkek a kamionról való biztonságos lerakodása és az étterem raktárába való elhelyezése.",
      state: TaskState.ASSIGNED,
      supervisor_id: 3,
      assignee_id: "7",
      due_date: new Date("2023-09-27"),
      time_target: 10,
      location_id: 9,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
      image_available: false,
      image_number: null,
      time_started: null,
      time_finished: null,
      creation_dttm: new Date("2023-09-20"),
      display_name: "BME I Épület"
    },

  ]


}


