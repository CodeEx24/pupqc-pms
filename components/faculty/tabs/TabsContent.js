import React from 'react';

function TabsContent({
  assessment,
  criteriaOverall,
  handleAddCriteriaClick,
  handleDeleteCriteriaClick,
}) {
  const criteriaListElement = criteriaOverall?.map((item, index) => {
    return (
      <div className="flex flex-col gap-2" key={index}>
        <p className="text-lg text-gray-800">
          {assessment
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
          {index + 1}:
        </p>

        <p className="text-lg">{criteriaOverall[index]}</p>
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
          <button
            className="btn-primary-no-width px-3 mt-3"
            onClick={() => handleAddCriteriaClick(assessment)}
          >
            ADD {assessment.toUpperCase().replace(/_/g, ' ')}
          </button>
          <button
            className="btn-danger-no-width px-3 mt-3"
            onClick={() => handleDeleteCriteriaClick(assessment)}
          >
            DELETE LAST {assessment.toUpperCase().replace(/_/g, ' ')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TabsContent;
