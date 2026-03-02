import {
  Component,
  Input,
  Output,
  EventEmitter,
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

export interface PriceRange {
  min: number;
  max: number;
}

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss',
})
export class PriceChartComponent implements AfterViewInit, OnChanges {
  @Input() data: House[] = [];
  @Output() barClick = new EventEmitter<PriceRange>();
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  chartOptions: echarts.EChartsOption = {};
  private chartInstance: echarts.ECharts | null | undefined = null;

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
    const buckets: Record<string, { count: number; min: number; max: number }> = {};

    this.data.forEach((house) => {
      const bucketIndex = Math.floor((house.price_million_yen - min) / bucketSize);
      const bucketMin = min + bucketIndex * bucketSize;
      const bucketMax = min + (bucketIndex + 1) * bucketSize;
      const label = `¥${Math.round(bucketMin)}-${Math.round(bucketMax)}M`;

      if (!buckets[label]) {
        buckets[label] = { count: 0, min: bucketMin, max: bucketMax };
      }
      buckets[label].count += 1;
    });

    const labels = Object.keys(buckets);
    const counts = labels.map((label) => buckets[label].count);

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

    // Set up click handler after chart is ready
    setTimeout(() => {
      const chartElement = this.chartContainer?.nativeElement;
      if (chartElement) {
        this.chartInstance = echarts.getInstanceByDom(chartElement);
        if (this.chartInstance) {
          // Remove previous listeners
          this.chartInstance.off('click');

          // Add click listener
          this.chartInstance.on('click', (params: any) => {
            if (params.componentSubType === 'bar') {
              const dataIndex = params.dataIndex;
              const label = labels[dataIndex];
              const range = buckets[label];
              this.barClick.emit({ min: range.min, max: range.max });
            }
          });
        }
      }
    }, 100);
  }
}
