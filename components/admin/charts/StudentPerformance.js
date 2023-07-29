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

function StudentPerformance({
  studentPerformance,
  studentDetails,
  careerRecommendation,
}) {
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

  console.log('studentPerformance: ', studentPerformance);

  return (
    <div className="h-full w-full flex flex-col">
      <h6 className="text-h4 font-bold text-primary mb-3">Performance</h6>
      <div className="flex mb-5 flex-wrap">
        <h6 className="text-lg font-bold w-1/2">
          Name:{' '}
          <span className="font-semibold text-gray-700">
            {studentDetails.name}
          </span>
        </h6>

        <h6 className="text-lg font-bold w-1/2">
          Email:{' '}
          <span className="font-semibold text-gray-700">
            {studentDetails.email}
          </span>
        </h6>
        {/* <h6 className="text-lg font-bold w-full">Career Reccomendation: </h6> */}
        <span className="font-semibold text-gray-700 mt-2">
          {careerRecommendation}
        </span>
      </div>
      {/* <h6 className="text-lg font-bold w-1/2"></h6> */}

      <div className="flex-grow-1 w-full">
        <ChartComponent
          id="charts-student-performance"
          title="Graduated Student Performance"
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
              dataSource={studentPerformance}
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

export default StudentPerformance;
