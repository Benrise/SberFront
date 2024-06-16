import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {}

interface ApexChartState {
  series: {
    name: string;
    data: { x: string; y: number; z: number }[];
  }[];
  options: ApexOptions
}

class BubbleChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Осноаные средста',
          data: this.generateData(new Date('24 июля 2024').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Запасы',
          data: this.generateData(new Date('24 июля 2024').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Объекты учета',
          data: this.generateData(new Date('24 июля 2024').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Задачи',
          data: this.generateData(new Date('24 июля 2024').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        title: {
          text: 'График распределения запасов',
        },
        xaxis: {
          tickAmount: 12,
          type: 'category',
        },
        yaxis: {
          max: 70,
        },
      },
    };
  }

  generateData(baseval: number, count: number, yrange: { min: number; max: number }) {
    const series = [];
    for (let i = 0; i < count; i++) {
      const x = `w${i + 1}`;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      const z = Math.floor(Math.random() * 75) + 15;

      series.push({ x, y, z });
    }
    return series;
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bubble"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export { BubbleChart };
