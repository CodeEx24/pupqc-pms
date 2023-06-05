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
import React from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
import { useMutation } from '@tanstack/react-query';
import { updateAllClassSubject } from '../../hooks/Admin/updateData';

function ClassList({ classList }) {
  console.log('CLASS LIST: ', classList);

  const classListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: classList,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const updateAllClassSubjectMutation = useMutation(updateAllClassSubject);
  const onFinalizeGrade = async (id, semester) => {
    console.log('FINALIZED GRADE OF THIS: ', id);
    await updateAllClassSubjectMutation.mutateAsync({ id, semester });
    // Add data to the database or update

    // Disable in table the gradeIsFinalized (boolean)
    // Calculate the classSubject Grade to accumulate or grades
  };

  const onRevokeFinalizedGrade = (id) => {
    console.log('REVOKE GRADE OF THIS: ', id);
  };

  return (
    <>
      <GridComponent
        dataSource={classListDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          {/* <ColumnDirective
            field="teacher"
            headerText="Teacher"
            width="100"
            textAlign="Left"
          /> */}
          <ColumnDirective
            field="class"
            headerText="Class Name"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="semester"
            headerText="Semester"
            width="100"
            textAlign="Left"
            template={(rowData) => {
              return (
                <p>
                  {rowData.semester === 1
                    ? '1st Semester'
                    : rowData.semester === 2
                    ? '2nd Semester'
                    : 'Summer Term'}
                </p>
              );
            }}
          />

          <ColumnDirective
            field="batch"
            headerText="Year"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="class_id"
            headerText="Action"
            width="140"
            template={(rowData) => (
              <div className="flex gap-3">
                <button
                  className={`btn-primary ${
                    rowData.isGradeFinalized ? 'opacity-60' : ''
                  }`}
                  disabled={rowData.isGradeFinalized}
                  onClick={() =>
                    onFinalizeGrade(rowData.class_id, rowData.semester)
                  }
                >
                  Finalize
                </button>
                <button
                  className={`btn-warning ${
                    rowData.isGradeFinalized ? '' : 'opacity-60'
                  }`}
                  disabled={!rowData.isGradeFinalized}
                  onClick={() => onRevokeFinalizedGrade(rowData.class_id)}
                >
                  Revoke
                </button>
              </div>
            )}
          />
          {/* <ColumnDirective
            field="batch"
            headerText="Batch"
            width="70"
            textAlign="Left"
          /> */}

          {/* <ColumnDirective
            field=""
            headerText="Finalize Grades"
            width="140"
            template={(rowData) => (
              <div className="flex gap-3">
                <button
                  className="btn-primary"
                  onClick={() => onFinalizeGrade(rowData.classSubject_id)}
                >
                  Finalize
                </button>
                <button
                  className="btn-warning"
                  onClick={() =>
                    onRevokeFinalizedGrade(rowData.classSubject_id)
                  }
                >
                  Revoke
                </button>
              </div>
            )}
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
          /> */}
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
}

export default ClassList;
