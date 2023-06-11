import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2/dropdowns';

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
      const res = await deleteClassSubject(classId);
      await refetchSubjectClass();
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while deleting the subject.');
      }
    }
  };

  const subjectClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectClass.classDataRecord,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const semesterOptions2 = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'semester';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', '1st Semester', '2nd Semester', 'Summer Term'],
        placeholder: 'Select a value',
        popupHeight: '200px',
        change: (e) => {
          const gridObj =
            document.getElementsByClassName('e-grid')[0].ej2_instances[0];
          e.value === 'All'
            ? gridObj.removeFilteredColsByField('semester')
            : gridObj.filterByColumn('semester', 'equal', e.value);
        },
      });
      DropDownListObj.appendTo('#semester');
    },
  };

  const classNameOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...(subjectClass.classNameList || [])],
        placeholder: 'Select a value',
        popupHeight: '200px',
        change: (e) => {
          const gridObj =
            document.getElementsByClassName('e-grid')[0].ej2_instances[0];
          e.value === 'All'
            ? gridObj.removeFilteredColsByField('class_name')
            : gridObj.filterByColumn('class_name', 'equal', e.value);
        },
      });
      DropDownListObj.appendTo('#class_name');
    },
  };

  const deleteAction = (e, id) => {
    e.preventDefault();
    console.log('ID OF IT: ', id);
    setClassId(id);
    setShowDeleteModal(true);
  };
  let grid;
  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };
  return (
    <>
      <GridComponent
        id="grid2"
        dataSource={subjectClassDataManager}
        toolbar={toolbar}
        allowPdfExport={true}
        allowPaging={true}
        toolbarClick={toolbarClick}
        ref={(g) => (grid = g)}
        allowSorting={true}
        allowFiltering={true}
        pageSettings={pageOptions}
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
            filterBarTemplate={classNameOptions}
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
            filterBarTemplate={semesterOptions2}
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
            allowSearching={false}
            template={(rowData) => (
              <button
                className={`btn-secondary ${
                  rowData.isGradeFinalized ? 'opacity-60' : ''
                }`}
                disabled={rowData.isGradeFinalized}
                onClick={(e) => deleteAction(e, rowData.classSubject_id)}
              >
                Delete
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
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
