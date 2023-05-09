import React from 'react';

function TabsContentStudentManagement({ assessment, assessmentItem }) {
  console.log('ASSESSMENT: ', assessment);
  console.log('ASSESSMENT ITEM: ', assessmentItem);

  const assessmentInputElement = assessmentItem.map((item, index) => {
    return (
      <div key={index} className="w-2/12">
        <p className="text-black z-99">
          {assessment.toUpperCase().replace('_', ' ')} {index + 1}
        </p>
        <input
          type="number"
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2 "
        />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-wrap gap-0 w-full">
        {assessmentInputElement}
      </div>
      <div className="flex justify-end align-bottom mt-4 h-1/6">
        <button
          type="button"
          //   onClick={() => setShowPerformanceModal(false)}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-sky-500 text-white rounded-md px-4 py-2"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default TabsContentStudentManagement;
