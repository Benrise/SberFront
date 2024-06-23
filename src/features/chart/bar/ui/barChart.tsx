import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  data: {
    categories: string[];
    series: number[];
  };
}

interface BarChartState {
  series: ApexAxisChartSeries;
  options: ApexOptions;
}

class BarChart extends React.PureComponent<BarChartProps, BarChartState> {
  constructor(props: BarChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Кол-во',
          data: props.data.series,
        },
      ],
      options: {
        title: {
          text: 'Количество услуг для каждого здания',
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: props.data.categories,
          title: {
            text: 'Количество уникальных услуг',
          },
        },
        yaxis: {
          title: {
            text: 'Количество услуг',
          },
        },
        fill: {
          colors: ['#00E396', '#FEB019'],
        },
        tooltip: {
          enabled: true,
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
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export { BarChart };
