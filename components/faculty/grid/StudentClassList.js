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
import { toast } from 'react-toastify';
import Processing from '../../Processing';
import { useMemo } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

function StudentClassList({ studentClass, refetchStudentClass }) {
  const [showperformanceModal, setShowPerformanceModal] = useState(false);
  const [tabDirectiveElement, setTabDirectiveElement] = useState(() => {});
  const [studentData, setStudentData] = useState({ name: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...(studentClass.data.classList || [])],
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

  const semesterOptions = {
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

  const pageOptions = useMemo(() => {
    return {
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      currentPage: 1,
    };
  }, []);

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
      setIsProcessing(true);
      const res = await axios.get(
        `/api/student/performance/${classSubjectId}/${studentId}`
      );

      const assessment = await res.data.studentRecord.records;
      const criteriaOverall = await res.data.criteriaOverall;

      const tabElement = Object.keys(assessment).map((item, index) => {
        return (
          <TabItemDirective
            key={`${studentId}${classSubjectId}${item}${index}`}
            header={{ text: item.toLocaleUpperCase().replace('_', ' ') }}
            content={() => (
              <TabsContentStudentManagement
                assessment={item}
                assessmentItem={[...assessment[item]]}
                setShowPerformanceModal={setShowPerformanceModal}
                criteriaOverall={criteriaOverall}
                studentId={studentId}
                classSubjectId={classSubjectId}
                refetchStudentClass={refetchStudentClass}
                setTabDirectiveElement={setTabDirectiveElement}
              />
            )}
          />
        );
      });

      const tabDirective = () => {
        return (
          <div className="h-full ">
            <div className="h-5/6 overflow-y-auto">
              <TabComponent heightAdjustMode="Auto">
                <TabItemsDirective>{tabElement}</TabItemsDirective>
              </TabComponent>
            </div>
          </div>
        );
      };

      setStudentData({
        name: res.data.studentRecord.name,
        email: res.data.studentRecord.email,
      });
      setTabDirectiveElement(tabDirective);
      setShowPerformanceModal(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
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
            field="semester"
            headerText="Semester"
            width="90"
            filterBarTemplate={semesterOptions}
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
                disabled={rowData.isGradeFinalized}
                className={`btn-primary px-3 ${
                  rowData.isGradeFinalized && 'opacity-60'
                }`}
              >
                Manage Grades
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
      </GridComponent>

      {showperformanceModal && (
        <div
          id="second-child"
          className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center "
        >
          <div
            className="bg-white rounded-md p-10 h-1/2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="float-right text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setShowPerformanceModal(false);
              }}
            >
              <MdOutlineCancel />
            </button>

            <div className="flex gap-10">
              <h2 className="text-lg font-medium mb-2">
                Name: <span className="font-normal">{studentData.name}</span>
              </h2>
              <h2 className="text-lg font-medium mb-2">
                Email: <span className="font-normal">{studentData.email}</span>
              </h2>
            </div>
            {tabDirectiveElement}
          </div>
        </div>
      )}

      {isProcessing && <Processing text="Getting the scores" />}
    </div>
  );
}

export default StudentClassList;
