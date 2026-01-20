import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts';
import { House } from 'models/house.model';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss',
})
export class PriceChartComponent implements AfterViewInit, OnChanges {
  @Input() data: House[] = [];
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  chartOptions: echarts.EChartsOption = {};

  ngAfterViewInit() {
    if (this.data.length > 0) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data.length > 0) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (this.data.length === 0) {
      return;
    }

    // Create price range buckets for histogram
    const min = Math.min(...this.data.map((h) => h.price_million_yen));
    const max = Math.max(...this.data.map((h) => h.price_million_yen));
    const bucketSize = Math.ceil((max - min + 1) / 8);
    const buckets: Record<string, number> = {};

    this.data.forEach((house) => {
      const bucketIndex = Math.floor((house.price_million_yen - min) / bucketSize);
      const label = `¥${Math.round(min + bucketIndex * bucketSize)}-${Math.round(
        min + (bucketIndex + 1) * bucketSize
      )}M`;

      buckets[label] = (buckets[label] || 0) + 1;
    });

    const labels = Object.keys(buckets);
    const counts = Object.values(buckets);

    this.chartOptions = {
      color: ['#2563eb'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: counts,
          type: 'bar',
          itemStyle: {
            color: '#2563eb',
          },
        },
      ],
    };
  }
}
