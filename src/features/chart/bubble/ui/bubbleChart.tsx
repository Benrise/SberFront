import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DataPoint {
  name: string;
  data: {
    x: number;
    y: number;
    z: number;
  };
}

interface BubbleChartProps {
  data: DataPoint[];
}

interface BubbleChartState {
  series: {
    name: string;
    data: { x: number; y: number; z: number }[];
  }[];
  options: ApexOptions;
}

class BubbleChart extends React.Component<BubbleChartProps, BubbleChartState> {
  constructor(props: BubbleChartProps) {
    super(props);

    const formattedData = props.data.map((point) => ({
      x: point.data.x,
      y: Math.round(point.data.y),
      z: point.data.z,
    }));

    this.state = {
      series: [
        {
          name: 'Общая сумма',
          data: formattedData,
        },
      ],
      options: {
        chart: {
          type: 'bubble',
        },
        colors: ['#0AA752'],
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        title: {
          text: 'График распределения затрат',
        },
        xaxis: {
          tickAmount: 10,
          type: 'numeric',
          title: {
            text: 'Частота',
          },
        },
        yaxis: {
          title: {
            text: 'Сумма затрат',
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => `${val} руб.`,
          },
          z: {
            formatter: (val: number) => `${val} руб.`,
            title: 'Потраченная сумма',
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
            type="bubble"
            width='100%'
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export { BubbleChart };
