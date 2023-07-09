import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

function StudentPerformance({ name, email, setShowPerformanceModal }) {
  return (
    <div
      id="childNode"
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center "
    >
      <div
        className="bg-white rounded-md p-10 h-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="float-right text-2xl"
          onClick={() => {
            setShowPerformanceModal(false);
          }}
        >
          <MdOutlineCancel />
        </button>
        <div className="flex gap-10">
          <h2 className="text-lg font-medium mb-2">
            Name: <span className="font-normal">{name}</span>
          </h2>
          <h2 className="text-lg font-medium mb-2">
            Email: <span className="font-normal">{email}</span>
          </h2>
        </div>
        <div className="h-full ">
          <div className="h-5/6 overflow-y-auto">
            {/* <TabComponent heightAdjustMode="Auto">
          <TabItemsDirective>{tabDirectiveElement}</TabItemsDirective>
        </TabComponent> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPerformance;
