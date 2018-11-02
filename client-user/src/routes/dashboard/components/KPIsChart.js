import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

const area = {};
area.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Aquisition', 'Revenue', 'Referral'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: false
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      max: 100,
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Aquisition',
      type: 'bar',
      data: [30, 15, 15, 45, 72],
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.primary
        }
      },
      lineStyle: {
        normal: {
          color: CHARTCONFIG.color.primary
        }
      },
      areaStyle: {
        normal: {
          color: CHARTCONFIG.color.primary
        }
      },
      symbol: 'diamond'
    },
    {
      name: 'Revenue',
      type: 'bar',
      data: [66, 12, 36, 42, 39],
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      lineStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      areaStyle: {
        normal: {
          color: CHARTCONFIG.color.info
        }
      },
      symbol: 'diamond'
    },
    {
      name: 'Referral',
      type: 'bar',
      barCategoryGap: '35%',
      data: [45, 6, 57, 24, 33],
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      lineStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      areaStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      symbol: 'diamond'
    }
  ]
};

const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={area.options} showLoading={false} />
);

export default Chart;
