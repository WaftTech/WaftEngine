import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

const data = [{
  value: 550,
  name: 'Direct',
}, {
  value: 960,
  name: 'Search'
}, {
  value: 680,
  name: 'Referrals'
}, {
  value: 460,
  name: 'Social'
}, {
  value: 330,
  name: 'Display'
}, {
  value: 200,
  name: 'Unkonw'
}];

const pie = {};
pie.options = {
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'right',
    data: ['Display', 'Social', 'Direct', 'Search', 'Referrals'],
  },
  series: [{
    type: 'pie',
    selectedMode: 'single',
    radius: ['38%', '51%'],
    color: [
      '#5395D5',
      '#54BBCD',
      '#60D5A8',
      '#91E57F',
      '#DDF388',
      '#EBDE9B'
    ],
    label: {
      normal: {
        position: 'outside',
        formatter: '{b}',
        textStyle: {
          fontSize: 12
        }
      }
    },
    labelLine: {
      normal: {
        show: true
      }
    },
    data,
    markPint: {
      symbol: 'diamond',
      data: [{symbol: 'diamond', }]
    }
  }]
};
const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={pie.options} showLoading={false} theme={"macarons"} />
);

export default Chart;
