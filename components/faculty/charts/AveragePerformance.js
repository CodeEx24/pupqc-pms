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

function AveragePerformance() {
  const data = [
    { year: 2013, averageGrade: 85 },
    { year: 2014, averageGrade: 83 },
    { year: 2015, averageGrade: 90 },
    { year: 2016, averageGrade: 93 },
    { year: 2017, averageGrade: 90 },
    { year: 2018, averageGrade: 87 },
    { year: 2019, averageGrade: 85 },
    { year: 2020, averageGrade: 88 },
    { year: 2021, averageGrade: 90 },
    { year: 2022, averageGrade: 91 },
  ];
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
    <ChartComponent
      id="charts-average-performance"
      title="Average Performance"
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
          dataSource={data}
          xName="year"
          yName="averageGrade"
          name="Performance"
          marker={{ dataLabel: { visible: true }, visible: true }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default AveragePerformance;
