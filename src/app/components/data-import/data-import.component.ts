import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/interface/task.interface';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { TaskService } from 'src/app/serivces/task.service';
import * as xlsx from 'xlsx';
import { MessageDialogComponent } from '../dialog/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent {

  constructor (private taskService: TaskService, private authService: AuthenticationService, private dialog: MatDialog) {}

  fileName = "no files chosen"
  defaultLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Icon_Notes.svg/640px-Icon_Notes.svg.png"
  taskList: any
  dataSource: any
  displayedColumns: string[] = ["name", "comment", "time_target", "description", "due_date", "location_id", "image_number"]
  columnsToDisplay: string[] = this.displayedColumns.slice();

  readFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    this.fileName = file.name
    fileReader.onload = (e: any) => {
      try {
        const data = e.target.result;
        const parsedData = xlsx.read(data, { type: 'array' });
        const sheet = parsedData.Sheets[parsedData.SheetNames[0]];
        this.taskList = xlsx.utils.sheet_to_json(sheet, { raw: true });
        this.dataSource = new MatTableDataSource<any>(this.taskList);
        //this.saveTasks(this.taskList);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };
  
    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  
    fileReader.readAsArrayBuffer(file);
  }
  

  saveTasks() {
    let saveSuccess = true
    if(this.taskList){
      for (let task of this.taskList) {
        const newTask = {
          name: task.name,
          comment: task.comment,
          description: task.description,
          state: "UNASSIGNED",
          supervisor_id: this.authService.getUserData().id,
          assignee_id: null,
          due_date: task.due_date,
          time_target: task.time_target,
          location_id: task.location_id,
          logo: task.logo ? task.logo : this.defaultLogo,
          image_available: false,
          image_number: task.image_number,
          time_started: null,
          time_finished: null,
          creation_dttm: this.taskService.getCurrentDate()
        } 
        this.taskService.createTask(newTask).subscribe((success) => {
          if(!success){
            saveSuccess = false
          }
        });
      }
      if(saveSuccess){
        this.dialog.open(MessageDialogComponent, {
          data: 'Imported tasks saved successfully'
        });
      } else{
        this.dialog.open(MessageDialogComponent, {
          data: "Error saving imported tasks. Please try again later. If the issue persists, feel free to contact our support team."
        });
      }
    }

  }

}
