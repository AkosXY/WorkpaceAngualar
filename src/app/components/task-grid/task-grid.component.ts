import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task, TaskState } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/serivces/task.service';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TaskGridComponent {

  dataSource: any;
  columnsToDisplay = ['name', 'state'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,  'expand'];
  columnNames: string[] = [
    'Name',
    'State',
    'Edit',
  ];
  expandedElement: Task | null | undefined;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private taskService: TaskService){
      //this.initTable()
      this.dataSource = this.CONST_DATA
  }

  initTable(){
    this.dataSource = new MatTableDataSource<Worker>();
    this.fetchAllTaskList();
    this.dataSource.sort = this.sort;
  }


  fetchMyTaskList(){
    this.taskService.getMyTasks().subscribe((resp) => {
        this.dataSource = resp.tasks
    });
  }

  fetchAllTaskList(){
    this.taskService.getAllTasks().subscribe((resp) => {
        console.log(resp)
        this.dataSource = resp
    });
  }


  handleButtonContainerClick(event: Event): void {
    event.stopPropagation();
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


