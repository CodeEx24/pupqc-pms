import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Search,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import React, { useState } from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';

function CriteriaList({ criteria }) {
  const [showCriteriaModal, setshowCriteriaModal] = useState(false);
  const [criteriaElement, setcriteriaElement] = useState();

  const criteriaListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: criteria,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const handleViewCriteria = async (criteriaId) => {
    const criteriaData = await axios.get('/api/admin/criteria/details', {
      params: { criteriaId },
    });

    // Why CRITERIA HERE IS UNDEFINED EVEN IT HAS A VALUE IN THIS
    const data = criteriaData.data;

    const keys = Object.keys(data.criteria.percentage);

    // Map the keys to get the child of it (assessment)
    const criteriaAssessmentElement = keys.map((item) => {
      const assessmentElement = Object.keys(data.criteria[item]).map(
        (assessment) => {
          return (
            <p key={assessment}>
              {assessment.toUpperCase().replace('_', ' ')}:{' '}
              {data.criteria[item][assessment].weightage * 100}%
            </p>
          );
        }
      );
      return (
        <div key={item}>
          <h1 className="text-lg font-semibold">
            {item.toUpperCase().replace('_', ' ')}:{' '}
            {data.criteria.percentage[item] * 100}%
          </h1>
          <div className="p-3">{assessmentElement}</div>
        </div>
      );
    });

    const criteriaElement = (
      <>
        <h1 className="text-2xl font-bold text-sky-500 mb-3">{data.name}:</h1>
        {criteriaAssessmentElement}
      </>
    );

    setcriteriaElement(criteriaElement);
    setshowCriteriaModal(true);
  };

  const handleModalClose = () => {
    setshowCriteriaModal(false);
  };

  return (
    <>
      <GridComponent
        dataSource={criteriaListDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            headerText="Criteria ID"
            width="100"
            textAlign="Left"
            template={({ index }) => {
              return <span>{Number(index) + 1}</span>;
            }}
          />

          <ColumnDirective
            field="name"
            headerText="Criteria Code"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field=""
            headerText="View Criteria"
            width="100"
            textAlign="Left"
            template={(rowData) => (
              <button
                // This should open modal with data of the student
                onClick={() => handleViewCriteria(rowData._id)}
                className="btn-primary px-3"
              >
                Criteria
              </button>
            )}
          />

          {/* <ColumnDirective
              field="_id"
              headerText="Subject Code"
              width="100"
              textAlign="Left"
            /> */}
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
      {showCriteriaModal && (
        <div
          className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-md p-10 w-4/12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-0 right-0 p-5 cursor-pointer"
              onClick={() => setshowCriteriaModal(false)}
            >
              <AiOutlineCloseCircle size={24} />
            </div>
            <div className="h-full">
              <div className="h-5/6 overflow-y-auto">{criteriaElement}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CriteriaList;
