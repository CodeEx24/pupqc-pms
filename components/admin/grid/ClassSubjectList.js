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
// import { useEffect } from 'react';
// import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { deleteClassSubject } from '../../hooks/Admin/deleteData';
import { toast } from 'react-toastify';

function ClassSubjectList({ subjectClass, refetchSubjectClass }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classId, setClassId] = useState('');

  const { handleSubmit } = useForm();

  const handleDeletingClass = async () => {
    try {
      setShowDeleteModal(false);
      await deleteClassSubject(classId);
      await refetchSubjectClass();
      toast.success('Subject deleted successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  const subjectClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectClass,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const deleteAction = (id) => {
    console.log('ID OF IT: ', id);
    setClassId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <GridComponent
        dataSource={subjectClassDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="teacher"
            headerText="Teacher"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="class_name"
            headerText="Class Name"
            width="70"
            textAlign="Left"
          />
          <ColumnDirective
            field="subject_id"
            headerText="Subject Code"
            width="70"
            textAlign="Left"
            isPrimaryKey={true}
          />

          <ColumnDirective
            field="criteria"
            headerText="Criteria"
            width="70"
            textAlign="Left"
          />
          <ColumnDirective
            field="semester"
            headerText="Semester"
            width="80"
            textAlign="Left"
          />
          <ColumnDirective
            field="batch"
            headerText="Batch"
            width="70"
            textAlign="Left"
          />

          <ColumnDirective
            field="classSubject_id"
            headerText="Delete"
            width="100"
            textAlign="Left"
            template={(rowData) => (
              <button
                className="btn-secondary"
                onClick={() => deleteAction(rowData.classSubject_id)}
              >
                Delete
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
      {showDeleteModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit(handleDeletingClass)}>
            <div className="bg-white rounded-md p-6">
              <h2 className="text-lg font-medium mb-2">
                Are you sure you want to delete the Class Subject?
              </h2>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Yes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ClassSubjectList;
