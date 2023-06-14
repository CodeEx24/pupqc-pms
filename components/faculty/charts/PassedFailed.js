/**
 * Sample for Area series
 */
import * as React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  ColumnSeries,
} from '@syncfusion/ej2-react-charts';
// import { Browser } from '@syncfusion/ej2-base';

/**
 * Area sample
 */

function PassedFailed() {
  const columnData = [
    { year: '2019', passed: 35, failed: 30 },
    { year: '2020', passed: 32, failed: 24 },
    { year: '2021', passed: 22, failed: 14 },
    { year: '2022', passed: 20, failed: 25 },
    { year: '2023', passed: 16, failed: 10 },
  ];

  // Set maximum and failed

  const primaryxAxis = { valueType: 'Category', title: 'Countries' };
  const primaryyAxis = {
    minimum: 0,
    maximum: 200,
    interval: 50,
    title: 'Number of Students',
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <ChartComponent
          id="charts-spline"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          title="Passed/Failed"
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={columnData}
              xName="year"
              yName="passed"
              name="Passed"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={columnData}
              xName="year"
              yName="failed"
              name="Failed"
              // columnSpacing={0.5}
              // columnWidth={0.75}
              type="Column"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
export default PassedFailed;
