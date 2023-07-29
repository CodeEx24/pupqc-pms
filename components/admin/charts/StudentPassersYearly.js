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

function StudentPassers({ studentsPassers, highest, interval }) {
  const primaryxAxis = { valueType: 'Category', title: 'Exam Passers' };
  const primaryyAxis = {
    minimum: 0,
    maximum: highest,
    interval: interval,
    title: 'Amount',
  };

  const tooltipSettings = {
    enable: true,
    format: '${point.x} - ${point.y} Students',
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <ChartComponent
          id="charts-column3"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          title="Exam Passers"
          tooltip={tooltipSettings}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
          />
          <SeriesCollectionDirective>
            {/* <SeriesDirective
              dataSource={studentsPassers}
              xName="year"
              yName="year"
              name="Passed"
              type="Column"
            ></SeriesDirective> */}
            <SeriesDirective
              dataSource={studentsPassers}
              xName="year"
              yName="count"
              name="Passers"
              type="Column"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
export default StudentPassers;
