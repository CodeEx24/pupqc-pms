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

function CriteriaList({ criteria }) {
  const [showCriteriaModal, setshowCriteriaModal] = useState(false);

  //   const [firstLayer, setFirstLayer] = useState({});
  //   const [assessment, setAssessment] = useState({});

  const [criteriaElement, setcriteriaElement] = useState();

  const criteriaDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: criteria.data,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const handleClickCriteria = async (criteriaId) => {
    const data = criteria.data.find((item) => item._id === criteriaId);

    // Get all key of first level in criteria.
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
        dataSource={criteriaDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="index"
            headerText="ID"
            width="100"
            textAlign="Left"
            isPrimaryKey={true}
            template={(rowData) => <p>{Number(rowData.index) + 1}</p>}
          />
          <ColumnDirective
            field="name"
            headerText="Criteria Code"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="_id"
            headerText="Criteria Overview"
            width="100"
            textAlign="Left"
            isPrimaryKey={true}
            template={(rowData) => (
              <button
                // This should open modal with data of the student
                onClick={() => handleClickCriteria(rowData._id)}
                className="btn-primary-no-width px-3"
              >
                Criteria
              </button>
            )}
          />
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
