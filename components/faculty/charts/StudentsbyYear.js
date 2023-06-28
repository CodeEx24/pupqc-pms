import React from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries,
} from '@syncfusion/ej2-react-charts';

function StudentsbyYear({ studentCurrentYearLevel }) {
  const legendSettings = { visible: true };
  const palettes = [
    '#E94649',
    '#F6B53F',
    '#6FAAB0',
    '#FF33F3',
    '#228B22',
    '#3399FF',
  ];
  // Sample data for the chart
  // const dataMapping = [
  //   { x: '1st Year', y: 20 },
  //   { x: '2nd Year', y: 30 },
  //   { x: '3rd Year', y: 25 },
  //   { x: '$th Year', y: 35 },
  // ];

  // Sample data for the data labels
  const datalabel = { visible: true, name: 'y', position: 'Outside' };
  const tooltip = { enable: true };
  const tooltipRender = (args) => {
    let value = (args.point.y / args.series.sumOfPoints) * 100;
    args.text = args.point.x + ' - ' + Math.round(value) + '' + '%';
  };
  return (
    <AccumulationChartComponent
      id="charts-accumulation"
      tooltip={tooltip}
      legendSettings={legendSettings}
      tooltipRender={tooltipRender}
    >
      <Inject
        services={[
          AccumulationDataLabel,
          AccumulationLegend,
          PieSeries,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={studentCurrentYearLevel}
          xName="x"
          yName="y"
          pointColorMapping="fill"
          dataLabel={datalabel}
          palettes={palettes}
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
}

export default StudentsbyYear;
