import React, { useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Sort,
  Toolbar,
  Inject,
} from '@syncfusion/ej2-react-grids';
import { useMutation } from '@tanstack/react-query';
import {
  finalizeSomeClassSubject,
  revokeSomeClassSubject,
} from '../../hooks/Admin/updateData';
import { toast } from 'react-toastify';
// import { useRef } from 'react';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
import { useMemo } from 'react';

function ClassList({ classList, refetchClassList }) {
  // const [gridDataSource, setGridDataSource] = useState(classList);
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  const pageOptions = useMemo(() => {
    return {
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      currentPage: 1,
    };
  }, []);

  const classListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: classList,
  });

  const finalizeSomeClassSubjectMutation = useMutation(
    finalizeSomeClassSubject
  );
  const revokeSomeClassSubjectMutation = useMutation(revokeSomeClassSubject);

  const handleFinalizeGradeClick = async (e, id, semester) => {
    e.preventDefault();
    if (isActionInProgress) return;
    toast.dismiss();
    setIsActionInProgress(true);

    try {
      console.log('FINALIZED GRADE OF THIS: ', id);
      const updateFinalizeGrade =
        await finalizeSomeClassSubjectMutation.mutateAsync({ id, semester });
      console.log('updateFinalizeGrade: ', updateFinalizeGrade);
      await refetchClassList();

      toast.success('Finalization of grade is successful.');
    } catch (error) {
      toast.error('Finalization of grade is failed.');
    } finally {
      setIsActionInProgress(false);
    }
  };

  const handleRevokeFinalizedGradeClick = async (e, id, semester) => {
    e.preventDefault();
    if (isActionInProgress) return;
    toast.dismiss();
    setIsActionInProgress(true);
    try {
      console.log('REVOKE GRADE OF THIS: ', id);
      const updateFinalizeGrade =
        await revokeSomeClassSubjectMutation.mutateAsync({ id, semester });
      console.log('updateFinalizeGrade: ', updateFinalizeGrade);
      await refetchClassList();

      toast.success('Revoke the finalization of grade is successful.');
    } catch (error) {
      toast.error('Revoke the finalization of grade is failed.');
    } finally {
      setIsActionInProgress(false);
    }
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
          <ColumnDirective
            field="class_name"
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
                  onClick={(e) => {
                    // e.preventDefault();
                    handleFinalizeGradeClick(
                      e,
                      rowData.class_id,
                      rowData.semester
                    );
                  }}
                >
                  Finalize
                </button>
                <button
                  className={`btn-warning ${
                    rowData.isGradeFinalized ? '' : 'opacity-60'
                  }`}
                  disabled={!rowData.isGradeFinalized}
                  onClick={(e) => {
                    // e.preventDefault();
                    handleRevokeFinalizedGradeClick(
                      e,
                      rowData.class_id,
                      rowData.semester
                    );
                  }}
                >
                  Revoke
                </button>
              </div>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
      {isActionInProgress && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white rounded-md p-5">
            <div className="flex gap-5 flex-col justify-center">
              <h1 className="text-p">Processing the Grade</h1>
              <div role="status" className="mx-auto">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassList;
