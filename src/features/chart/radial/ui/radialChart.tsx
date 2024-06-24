import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface RadialBarChartProps {
  value: number;
  label: string;
}

interface RadialBarChartState {
  series: number[];
  options: ApexOptions;
}

class RadialChart extends React.PureComponent<RadialBarChartProps, RadialBarChartState> {
  constructor(props: RadialBarChartProps) {
    super(props);

    this.state = {
      series: [props.value],
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91],
              colorStops: [
                {
                  offset: 0,
                  color: '#0AA752',
                  opacity: 1
                },
                {
                  offset: 100,
                  color: '#0AA752',
                  opacity: 1
                }
              ]
            },
          },
        stroke: {
          dashArray: 4,
        },
        labels: [props.label],
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
            type="radialBar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export { RadialChart };
