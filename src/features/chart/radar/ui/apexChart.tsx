import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ApexChartProps {}

interface ApexChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Продажи',
          data: [120, 150, 300, 200, 180, 250, 300],
        },
        {
          name: 'Общая подоходность',
          data: [100, 200, 150, 180, 220, 280, 300],
        },
        {
          name: 'Расходы',
          data: [80, 130, 200, 140, 120, 170, 230],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'radar',
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: '#e9e9e9',
              fill: {
                colors: ['#f8f8f8', '#fff'],
              },
            },
          },
        },
        title: {
          text: 'График растрат',
        },
        colors: ['#FF4560', '#008FFB', '#00E396'],
        markers: {
          size: 4,
          colors: ['#fff'],
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: (val: number) => {
              return val?.toString() || '---';
            },
          },
        },
        xaxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
        },
        yaxis: {
          labels: {
            formatter: (val: number, i: number) => {
              if (i % 2 === 0) {
                return val?.toString() || '---';
              } else {
                return '';
              }
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="radar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export { ApexChart };
