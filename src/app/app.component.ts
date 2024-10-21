import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'chart.js/auto';
import {PopulationResponse} from './interfaces/population-response.interface';
import {PopulationItem} from './interfaces/population-item.interface';
import {ChartType} from 'chart.js';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public chart: Chart;
  public data: PopulationResponse;

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    this.http.get<PopulationResponse>('https://datausa.io/api/data?drilldowns=Nation&measures=Population').subscribe({
        next: (data: PopulationResponse) => {
          console.log(data);
          this.data = data;
          this.createChart();
        }
      }
    )
  }

  public reloadChart(newView: ChartType): void {
    this.chart.destroy();
    this.createChart(newView)
  }

  private createChart(type: ChartType = 'bar'): void {
    this.chart = new Chart("MyChart", {
      type,
      data: {
        labels: this.data.data.map((i: PopulationItem) => i.Year),
        datasets: [
          {
            label: "Population",
            data: this.data.data.map((i: PopulationItem) => i.Population),
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 3.5
      }
    });
  }
}
