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

function TeacherAchievement({ teacherAchievement, highest, interval }) {
  const primaryxAxis = { valueType: 'Category', title: 'Achievements' };
  const primaryyAxis = {
    minimum: 0,
    maximum: highest + interval,
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
          id="charts-column"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          title="Achievements"
          tooltip={tooltipSettings}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={teacherAchievement}
              xName="year"
              yName="Publish Research"
              name="Publish Research"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={teacherAchievement}
              xName="year"
              yName="PhD"
              name="PhD"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={teacherAchievement}
              xName="year"
              yName="Awards"
              name="Awards"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={teacherAchievement}
              xName="year"
              yName="Grants"
              name="Grants"
              type="Column"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}
export default TeacherAchievement;
