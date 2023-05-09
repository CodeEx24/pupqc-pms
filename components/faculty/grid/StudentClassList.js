import React from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
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
import { useState } from 'react';
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';

import axios from 'axios';
import TabsContentStudentManagement from '../tabs/TabsContentStudentManagement';

function StudentClassList({ studentClass }) {
  console.log(studentClass);
  const [showperformanceModal, setShowPerformanceModal] = useState(false);
  const [tabDirectiveElement, setTabDirectiveElement] = useState(() => {});
  const [studentData, setStudentData] = useState({ name: '', email: '' });

  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...studentClass.data.classList],
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

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const studentsClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: studentClass.data.data,
  });

  let grid;

  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  const handleClickManageGrades = async (studentId, classSubjectId) => {
    try {
      const res = await axios.get(
        `/api/student/performance/${classSubjectId}/${studentId}`
      );

      console.log(res.data);

      const assessment = await res.data.studentRecord.records;
      // console.log('ASSESSMENT: ', assessment[0]);
      const tabElement = Object.keys(assessment).map((item, index) => {
        return (
          <TabItemDirective
            key={index}
            header={{ text: item.toLocaleUpperCase().replace('_', ' ') }}
            content={() => (
              <TabsContentStudentManagement
                assessment={item}
                assessmentItem={[...assessment[item]]}
                setShowPerformanceModal={setShowPerformanceModal}
                studentId={studentId}
                classSubjectId={classSubjectId}
              />
            )}
          />
        );
      });

      setStudentData({
        name: res.data.studentRecord.name,
        email: res.data.studentRecord.email,
      });
      setTabDirectiveElement(tabElement);
      setShowPerformanceModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GridComponent
        id="grid"
        dataSource={studentsClassDataManager}
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
            field="subject_id"
            headerText="Subject Code"
            width="100"
            textAlign="Left"
          />

          <ColumnDirective
            field="student_name"
            headerText="Name"
            width="130"
            textAlign="Left"
          />

          <ColumnDirective
            field="class_name"
            headerText="Class"
            width="100"
            filterBarTemplate={templateOptions}
            textAlign="Left"
          />
          <ColumnDirective
            field="batch"
            headerText="Batch"
            width="90"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="student_id"
            headerText="Performance Management"
            width="150"
            template={(rowData) => (
              <button
                // This should open modal with data of the student
                onClick={() =>
                  handleClickManageGrades(
                    rowData.student_id,
                    rowData.class_subject_id
                  )
                }
                className="btn-primary-no-width px-3"
              >
                Manage Grades
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
      </GridComponent>

      {showperformanceModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white rounded-md p-10 h-1/2">
            <div className="flex gap-10">
              <h2 className="text-lg font-medium mb-2">
                Name: <span className="font-normal">{studentData.name}</span>
              </h2>
              <h2 className="text-lg font-medium mb-2">
                Email: <span className="font-normal">{studentData.email}</span>
              </h2>
            </div>
            <div className="h-full ">
              <div className="h-5/6 overflow-y-auto">
                <TabComponent heightAdjustMode="Auto">
                  <TabItemsDirective>{tabDirectiveElement}</TabItemsDirective>
                </TabComponent>
              </div>
            </div>
            {/* <form onSubmit={handleSubmit(handleSubmitOverallScore)}>
              <input
                type="number"
                id="number"
                className={`border text-black bg-gray-50 outline-none rounded-md p-2 w-full ${
                  errors.number
                    ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                }`}
                min={0}
                {...register('number', { required: true })}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 text-white rounded-md px-4 py-2"
                >
                  Save
                </button>
              </div>
            </form> */}
          </div>
        </div>
      )}
    </>
  );
}

export default StudentClassList;
