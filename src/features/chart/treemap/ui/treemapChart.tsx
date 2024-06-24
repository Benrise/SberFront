import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface TreemapChartProps {
  data: Array<{
    x: string;
    y: number;
    cluster_hint: string[];
  }>;
}

interface TreemapChartState {
  series: Array<{
    data: Array<{
      x: string;
      y: number;
      hints: string[];
    }>;
  }>;
  options: ApexOptions;
}

class TreemapChart extends React.PureComponent<TreemapChartProps, TreemapChartState> {
  constructor(props: TreemapChartProps) {
    super(props);

    const transformedData = props.data.map(item => ({
      x: (item.x + 1).toString(),
      y: item.y,
      hints: item.cluster_hint,
    }));

    this.state = {
      series: [
        {
          data: transformedData,
        },
      ],
      options: {
        title: {
          text: 'Кластеризация по среднему числу услуг',
        },
        chart: {
          type: 'treemap',
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
        tooltip: {
          custom: function({ seriesIndex, dataPointIndex, w }) {
            const hints = w.config.series[seriesIndex].data[dataPointIndex].hints;
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const color = w.globals.colors[dataPointIndex];
            const displayedHints = hints.length > 10 ? hints.slice(0, 10).concat('...') : hints;
            return `<div class="apexcharts-tooltip-treemap p-2">
                      <div class="flex items-center gap-2">
                        <div style="background-color: ${color};" class="w-4 h-4 rounded-full"></div> 
                        <strong>Кластер зданий, ${data.y}:</strong>
                      </div>
                      ${displayedHints.map((hint:any) => `<div>${hint}</div>`).join('')}
                    </div>`;
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
            type="treemap"
            height={480}
          />
        </div>
      </div>
    );
  }
}

export { TreemapChart };
