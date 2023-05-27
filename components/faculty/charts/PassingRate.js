/**
 * Sample for Area series
 */
import * as React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  Highlight,
  SeriesDirective,
  Inject,
  Tooltip,
  DateTime,
  SplineAreaSeries,
  Legend,
} from '@syncfusion/ej2-react-charts';
// import { Browser } from '@syncfusion/ej2-base';

/**
 * Area sample
 */

function SplineArea() {
  let data1 = [
    { x: new Date(2002, 0, 1), y: 76 },
    { x: new Date(2003, 0, 1), y: 80 },
    { x: new Date(2004, 0, 1), y: 95 },
    { x: new Date(2005, 0, 1), y: 90 },
    { x: new Date(2006, 0, 1), y: 90 },
    { x: new Date(2007, 0, 1), y: 90 },
    { x: new Date(2008, 0, 1), y: 90 },
    { x: new Date(2009, 0, 1), y: 90 },
    { x: new Date(2010, 0, 1), y: 90 },
    { x: new Date(2011, 0, 1), y: 90 },
  ];
  let data2 = [
    { x: new Date(2002, 0, 1), y: 24 },
    { x: new Date(2003, 0, 1), y: 20 },
    { x: new Date(2004, 0, 1), y: 5 },
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 10 },
    { x: new Date(2007, 0, 1), y: 10 },
    { x: new Date(2008, 0, 1), y: 10 },
    { x: new Date(2009, 0, 1), y: 10 },
    { x: new Date(2010, 0, 1), y: 10 },
    { x: new Date(2011, 0, 1), y: 10 },
  ];

  const primaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    majorGridLines: { width: 0 },
    intervalType: 'Years',
    minimum: new Date(2002, 0, 1),
    maximum: new Date(2011, 0, 1),
    edgeLabelPlacement: 'Shift',
  };

  const primaryYAxis = {
    labelFormat: '{value}%',
    lineStyle: { width: 0 },
    maximum: 100,
    interval: 20,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <ChartComponent
          id="charts2"
          style={{ textAlign: 'center' }}
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          width={'100%'}
          legendSettings={{ enableHighlight: true }}
          chartArea={{ border: { width: 0 } }}
          title="Passing Rate in Percentage"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              name="Passed"
              marker={{
                visible: true,
                isFilled: true,
                height: 6,
                width: 6,
                shape: 'Circle',
              }}
              opacity={0.5}
              type="SplineArea"
              width={2}
              border={{ width: 2 }}
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data2}
              xName="x"
              yName="y"
              name="Failed"
              marker={{
                visible: true,
                isFilled: true,
                height: 7,
                width: 7,
                shape: 'Diamond',
              }}
              opacity={0.5}
              type="SplineArea"
              width={2}
              border={{ width: 2 }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
export default SplineArea;
