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
import React, { useEffect, useState, useRef } from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';

import { MdOutlineCancel } from 'react-icons/md';

function SubjectList({ subjects }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [modalElement, setModalElement] = useState();

  const modalRef = useRef(null);

  const subjectDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjects.data,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const handleClickView = (name, description, code) => {
    const element = () => {
      return (
        <div
          className="relative bg-white rounded-md p-10 lg:w-4/12 md:w-6/12 w-full"
          ref={modalRef}
        >
          <button
            type="button"
            onClick={() => setIsViewModal(false)}
            className="text-xl rounded-full hover:bg-light-gray absolute top-4 right-4"
          >
            <MdOutlineCancel />
          </button>

          <p className="text-h6 font-bold text-gray-700 mb-2">
            Subject Code: <span className="font-normal">{code}</span>
          </p>

          <p className="text-h6 font-bold text-gray-700 mb-2">
            Subject Name: <span className="font-normal">{name}</span>
          </p>
          <p className="w-full">Subject Description: {description}</p>
        </div>
      );
    };
    setModalElement(element);
    setIsViewModal(true);
  };

  const handleCloseModal = () => {
    setIsViewModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <GridComponent
        dataSource={subjectDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="_id"
            headerText="Subject Code"
            width="100"
            textAlign="Left"
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="description"
            headerText="View Details"
            width="100"
            textAlign="Left"
            template={(rowData) => (
              <button
                className="btn-primary"
                onClick={() =>
                  handleClickView(
                    rowData.name,
                    rowData.description,
                    rowData._id
                  )
                }
              >
                View
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
      {isViewModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {modalElement}
        </div>
      )}
    </>
  );
}

export default SubjectList;
