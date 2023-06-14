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

function PassedFailed({ passed, highest, interval }) {
  const primaryxAxis = { valueType: 'Category', title: 'Countries' };
  const primaryyAxis = {
    minimum: 0,
    maximum: highest,
    interval: interval,
    title: 'Number of Students',
  };

  const tooltipSettings = {
    enable: true,
    format: '${point.x} - ${point.y} Students',
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <ChartComponent
          id="charts-column"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          title="Passed/Failed"
          tooltip={tooltipSettings}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={passed}
              xName="year"
              yName="passed"
              name="Passed"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={passed}
              xName="year"
              yName="failed"
              name="Failed"
              type="Column"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
export default PassedFailed;
