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

function AveragePerformance({ averagePercentage }) {
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
          dataSource={averagePercentage}
          xName="year"
          yName="averagePercentage"
          name="Performance"
          marker={{ dataLabel: { visible: true }, visible: true }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default AveragePerformance;
