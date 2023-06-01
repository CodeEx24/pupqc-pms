import React from 'react';

function TabsContentPerformance({
  assessment,
  assessmentItem,
  criteriaOverall,
}) {
  console.log('ASSESSMENT ', assessment);
  console.log('ASSESSMENT ITEM', assessmentItem);
  console.log('ASSESSMENT OVERALL', criteriaOverall);
  const assessmentElement = assessmentItem.map((item, index) => {
    console.log('ITEM: ', item);
    return (
      <div
        className="flex flex-col gap-2 shadow-sm p-5 rounded-md border border-gray-200 text-center mt-5"
        key={index}
      >
        <p className="text-lg text-gray-800">
          {assessment
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
          {index + 1}
        </p>

        <div className="p-5 border">
          <p className="text-2xl font-semibold text-center text-sky-500">
            {item}
          </p>
          <hr />
          <p className="text-2xl font-semibold text-center text-red-500">
            {criteriaOverall[index]}
          </p>
        </div>
      </div>
    );
  });

  return <div className="flex flex-wrap gap-4">{assessmentElement}</div>;
}

export default TabsContentPerformance;
