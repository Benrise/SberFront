import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  data: {
    series: number[];
    labels: string[];
  }
}

interface PieChartState {
  series: number[];
  options: ApexOptions;
}

class PieChart extends React.Component<PieChartProps, PieChartState> {
  constructor(props: PieChartProps) {
    super(props);

    this.state = {
      series: props.data.series,
      options: {
        title: {
          text: 'Сумма распределения по месяцам и годам',
        },
        chart: {
          type: 'pie',
        },
        labels: props.data.labels,
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
            type="pie"
            width='75%'
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export { PieChart };
