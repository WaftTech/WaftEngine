import React from 'react';
import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

class CustomizedLabel extends React.PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

const LineChartComponent = ({
  data,
  width = 720,
  height = 250,
  XAxisKey,
  Line1Key,
  Line2Key,
  Line3Key,
  skew = false,
}) => (
  <LineChart
    width={720}
    height={250}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    {skew ? (
      <XAxis dataKey={XAxisKey} height={120} tick={<CustomizedAxisTick />} />
    ) : (
      <XAxis dataKey={XAxisKey} />
    )}
    <YAxis />
    <Tooltip />
    <Legend />
    {Line1Key && (
      <Line
        type="monotone"
        dataKey={Line1Key}
        stroke="#8884d8"
        label={<CustomizedLabel />}
      />
    )}
    {Line2Key && <Line type="monotone" dataKey={Line2Key} stroke="#82ca9d" />}
    {Line3Key && <Line type="monotone" dataKey={Line3Key} stroke="#e97171" />}
  </LineChart>
);

export default LineChartComponent;
