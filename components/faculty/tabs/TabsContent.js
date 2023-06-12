import React from 'react';

function TabsContent({
  assessment,
  criteriaOverall,
  handleAddCriteriaClick,
  handleDeleteCriteriaClick,
  isGradeFinalized,
}) {
  // console.log('isGradeFinalized: ', isGradeFinalized);
  const criteriaListElement = criteriaOverall?.map((item, index) => {
    return (
      <div
        className="flex flex-col gap-2 shadow-sm p-5 rounded-md border border-gray-200 text-center"
        key={index}
      >
        <p className="text-2xl font-semibold text-center text-sky-500">
          {criteriaOverall[index]}
        </p>
        <p className="text-lg text-gray-800">
          {assessment
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
          {index + 1}
        </p>
      </div>
    );
  });

  return (
    <div className="p-3 border border-gray-50">
      <div className="p-3">
        <h3 className="text-gray-800 text-xl font-bold">
          {assessment.toUpperCase().replace(/_/g, ' ')}
        </h3>

        <div className="flex flex-wrap mt-4 gap-y-5 gap-x-10">
          {criteriaListElement.length ? (
            criteriaListElement
          ) : (
            <p className="text-lg text-gray-800">NO RECORDS</p>
          )}
        </div>
        <div className="flex gap-5">
          {isGradeFinalized ? (
            <p className="text-p text-secondary">
              The Grades has been already finalized.
            </p>
          ) : (
            <>
              <button
                className={`btn-primary px-3 mt-3 `}
                onClick={() => handleAddCriteriaClick(assessment)}
              >
                ADD {assessment.toUpperCase().replace(/_/g, ' ')}
              </button>
              <button
                className={`btn-secondary px-3 mt-3 `}
                onClick={() => handleDeleteCriteriaClick(assessment)}
              >
                DELETE LAST {assessment.toUpperCase().replace(/_/g, ' ')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TabsContent;
