import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title: string = 'Sin titulo';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  constructor() { }

  ngOnInit(): void {

    this.doughnutChartData =
    {
      labels: this.labels,
      datasets:
      [
        {
          data: this.data
        }
      ]
    };
  }

    // Doughnut
    public doughnutChartLabels: string[] = this.labels;
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data,
         backgroundColor: ['#FFFC33','#33FFC6','#3C98FF', '#FFE29A'],
         hoverBackgroundColor: ['#fffc3378','#33ffc687','#3c98ff96', '#ffe29a9e'],
         hoverBorderColor:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']

        },
       //
      ]
    };
    public doughnutChartType: ChartType = 'doughnut';

   //  // events
   //  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   //    console.log(event, active);
   //  }

   //  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
   //    console.log(event, active);
   //  }


}
