import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  DataLabel,
} from '@syncfusion/ej2-react-charts';

function TeacherPerformance({ teacherPerformance, teacherDetails }) {
  console.log('teacherPerformance: ', teacherPerformance);
  const primaryxAxis = { valueType: 'Category', title: 'Year' };
  const primaryyAxis = {
    title: 'Percentage',
    minimum: 0, // Set your desired minimum value here
    maximum: 100, // Set your desired maximum value here
    interval: 20,
  };
  const tooltipSettings = {
    enable: true,
    format: '${point.y}% - ${point.x}',
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h6 className="text-h4 font-bold text-primary mb-3">Performance</h6>
      <div className="flex mb-5 flex-wrap">
        <h6 className="text-lg font-bold w-1/2">
          Name:{' '}
          <span className="font-semibold text-gray-700">
            {teacherDetails.name}
          </span>
        </h6>
        <h6 className="text-lg font-bold w-1/2">
          Status:{' '}
          <span className="font-semibold text-gray-700">
            {teacherDetails.status}
          </span>
        </h6>
        <h6 className="text-lg font-bold w-1/2">
          Email:{' '}
          <span className="font-semibold text-gray-700">
            {teacherDetails.email}
          </span>
        </h6>
      </div>

      <div className="flex-grow-1 w-full">
        <ChartComponent
          id="charts-teacher-performance"
          title="Teacher Performance"
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
          tooltip={tooltipSettings}
        >
          <Inject
            services={[
              ColumnSeries,
              Tooltip,
              LineSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={teacherPerformance}
              xName="year"
              yName="averagePercentage"
              name="Performance"
              marker={{ dataLabel: { visible: true }, visible: true }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>{' '}
      </div>
    </div>
  );
}

export default TeacherPerformance;
