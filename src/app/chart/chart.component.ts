import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartType: ChartType = 'bar'; // Tipo de gráfico (por defecto: bar)
  @Input() chartData: any[] = []; // Datos del gráfico
  @Input() chartLabels: string[] = []; // Etiquetas del eje X
  @Input() chartOptions: ChartConfiguration['options'] = {}; // Opciones de configuración

  private chart: Chart | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Actualiza el gráfico si los datos o configuraciones cambian
    if (this.chart) {
      this.chart.data.labels = this.chartLabels;
      this.chart.data.datasets = this.formatChartData();
      this.chart.update();
    }
  }

  private initChart() {
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: this.chartType,
        data: {
          labels: this.chartLabels,
          datasets: this.formatChartData(),
        },
        options: this.chartOptions,
      });
    }
  }

  private formatChartData() {
    // Convierte los datos en datasets de Chart.js
    return [
      {
        label: 'Dataset',
        data: this.chartData.map((item) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ];
  }
}