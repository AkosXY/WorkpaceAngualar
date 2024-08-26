import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { Observable, map, startWith } from 'rxjs';
import { ChartService } from 'src/app/serivces/chart.service';
import { Worker } from 'src/app/interface/worker.interface';
import { WorkerService } from 'src/app/serivces/worker.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  barChart: any;
  barChartDone: any;
  barChartPending: any;
  pieChart: any;

  chartData = {
    "all_tasks": 0,
    "all_done": 0,
    "in_time_done": 0,
    "in_time_undone": 0,
    "overdue_done": 0,
    "overdue_undone": 0
  };

  submitForm = new FormGroup({
    startDateForm: new FormControl<Date | null>(null),
    endDateForm: new FormControl<Date | null>(null),
    workerForm: new FormControl('')

  })

  filteredOptions: Observable<Worker[]> | undefined;
  workerOptions: Worker[] = [];
  selectedWorker: number | undefined

  generalDisplayTitle = 'Displaying general data regarding admin: '
  userDisplayTitle = 'Displaying analitics for user: '
  displayTitle = this.generalDisplayTitle

  constructor(private chartService: ChartService, private workerService: WorkerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.initOptions()
    this.initChart();
  }


  initOptions() {
    this.workerService.getMyWorkers().subscribe((resp) => {
      this.workerOptions = resp;
      this.workerForm?.reset();
    });
    this.filteredOptions = this.workerForm?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Worker[] {
    const filterValue = value.toLowerCase();
    return this.workerOptions.filter(options => options.name.toLowerCase().includes(filterValue));
  }

  initChart() {

    this.chartService.getGeneralStatistics().subscribe((resp) => {
      this.chartData = resp
      this.drawChart()
    })
  }

  drawChart() {
    this.createBarChart();
    this.createBarChartDone();
    this.createBarChartPending();
    this.createPieChart();
  }

  submit() {
    if (this.submitForm.valid) {
      if (!!this.workerForm?.value) {
        this.loadUserStatistics()
      } else {
        this.loadGeneralStatistics()
      }
    }
  }

  loadGeneralStatistics() {
    this.displayTitle = this.generalDisplayTitle
    let startDate = this.datePipe.transform(this.startDateForm?.value, 'yyyy-MM-dd') || '1900-01-01'
    let endDate = this.datePipe.transform(this.endDateForm?.value, 'yyyy-MM-dd') || '2100-01-01'
    this.chartService.getGeneralStatistics(startDate, endDate).subscribe((resp) => {
      this.chartData = resp
      this.updateCharts()
    })

  }

  loadUserStatistics() {
    this.displayTitle = this.userDisplayTitle + this.workerForm?.value
    let startDate = this.datePipe.transform(this.startDateForm?.value, 'yyyy-MM-dd') || '1900-01-01'
    let endDate = this.datePipe.transform(this.endDateForm?.value, 'yyyy-MM-dd') || '2100-01-01'
    this.chartService.getUserStatistics(startDate, endDate, this.selectedWorker).subscribe((resp) => {
      this.chartData = resp
      this.updateCharts()
    })

  }

  updateCharts() {
    this.barChart.data.datasets[0].data = [
      this.chartData.all_tasks,
      this.chartData.all_done,
      this.chartData.all_tasks - this.chartData.all_done,
    ]
    this.barChartDone.data.datasets[0].data = [
      this.chartData.all_done, //All Done
      this.chartData.in_time_done, //In Time Done
      this.chartData.overdue_done, //Overdue Done
    ]
    this.barChartPending.data.datasets[0].data = [
      this.chartData.all_tasks - this.chartData.all_done, //All Pending
      this.chartData.in_time_undone, //In Time Undone
      this.chartData.overdue_undone  //Overdue Undone
    ]
    this.pieChart.data.datasets[0].data = [
      this.chartData.in_time_done,
      this.chartData.in_time_undone,
      this.chartData.overdue_done,
      this.chartData.overdue_undone
    ]

    this.barChart.update()
    this.barChartDone.update()
    this.barChartPending.update()
    this.pieChart.update()

  }

  createBarChart(): void {
    this.barChart = new Chart("taskChart", {
      type: 'bar',
      data: {
        labels: ['All Tasks', 'All Done', 'All Pending'
        ],
        datasets: [{
          label: 'Task Summary',
          data: [
            this.chartData.all_tasks, //All Tasks
            this.chartData.all_done, //All Done
            this.chartData.all_tasks - this.chartData.all_done, //All Pending
          ],
          backgroundColor: [
            'rgba(99, 99, 99, 0.2)',   //All Tasks
            'rgba(153, 102, 255, 0.2)', //All Done
            'rgba(255, 206, 86, 0.2)', //All Pending
          ],
          borderColor: [
            'rgba(99,99,99,1)', //All Tasks
            'rgba(153, 102, 255, 1)', //All Done
            'rgba(255, 206, 86, 1)', //All Pending
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  createBarChartDone(): void {
    this.barChartDone = new Chart("barChartDone", {
      type: 'bar',
      data: {
        labels: ['All Done', 'In Time Done', 'Overdue Done'],
        datasets: [{
          label: 'Done tasks',
          data: [
            this.chartData.all_done, //All Done
            this.chartData.in_time_done, //In Time Done
            this.chartData.overdue_done, //Overdue Done

          ],
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)', //All Done
            'rgba(75, 192, 192, 0.2)', //In Time Done
            'rgba(255, 159, 64, 0.2)', //Overdue Done
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)', //All Done
            'rgba(75, 192, 192, 1)', //In Time Done
            'rgba(255, 159, 64, 1)', //Overdue Done
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createBarChartPending(): void {
    this.barChartPending = new Chart("barChartPending", {
      type: 'bar',
      data: {
        labels: ['All Pending', 'In Time', 'Overdue'],
        datasets: [{
          label: 'Pending tasks',
          data: [
            this.chartData.all_tasks - this.chartData.all_done, //All Pending
            this.chartData.in_time_undone, //In Time Undone
            this.chartData.overdue_undone  //Overdue Undone
          ],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)', //All Pending
            'rgba(54, 162, 235, 0.2)', //In Time Undone
            'rgba(255, 99, 132, 0.2)', //Overdue Undone
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)', //All Pending
            'rgba(54, 162, 235, 1)', //In Time Undone
            'rgba(255,99,132,1)' //Overdue Undone
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  createPieChart(): void {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['In Time Done', 'In Time Undone', 'Overdue Done', 'Overdue Undone'],
        datasets: [{
          data: [
            this.chartData.in_time_done,
            this.chartData.in_time_undone,
            this.chartData.overdue_done,
            this.chartData.overdue_undone
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {}
    });
  }


  get startDateForm() {
    return this.submitForm.get('startDateForm');
  }

  get endDateForm() {
    return this.submitForm.get('endDateForm');
  }

  get workerForm() {
    return this.submitForm.get('workerForm');
  }
}
