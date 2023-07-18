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
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import Processing from '../../Processing';
import { useRef } from 'react';
import { useEffect } from 'react';
import StudentPerformance from '../charts/StudentPerformance';
import { toast } from 'react-toastify';

function StudentList({ students }) {
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [studentPerformance, setStudentPerformance] = useState({});
  const [slope, setSlope] = useState(0);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowPerformanceModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...(students.data.classList || [])],
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

  const studentsDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: students.data.data,
  });

  let grid;

  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  const handlePerformanceClick = async (e, studentId, name, email) => {
    try {
      e.preventDefault();
      setIsActionInProgress(true);

      const res = await axios.get('/api/faculty/student/performance', {
        params: {
          studentId,
        },
      });
      setStudentPerformance(res.data.studentPerformance);
      setSlope(
        res.data.slope > 0
          ? 'Going higher'
          : res.data.slope < 0
          ? 'Going lower'
          : 'Flat'
      );

      setStudentDetails({
        name,
        email,
      });
      setIsActionInProgress(false);
      setShowPerformanceModal(true);
    } catch (error) {
      // Handle the error appropriately
      toast.error('Error fetching student performance:', error);
      setIsActionInProgress(false);
      // Optionally, you can display an error message to the user
      // setError('Failed to fetch student performance. Please try again.');
    }
  };

  return (
    <>
      <GridComponent
        id="grid"
        dataSource={studentsDataManager}
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
            field="profileImageUrl"
            headerText="Profile Image"
            width="80"
            headerTextAlign="Center"
            allowFiltering={false}
            template={(rowData) => (
              <Image
                src={rowData.profileImageUrl}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full mx-auto"
                style={{ width: 'auto', height: 'auto' }}
              />
            )}
          />

          <ColumnDirective
            field="name"
            headerText="Name"
            width="130"
            textAlign="Left"
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="mobileNo"
            headerText="Mobile Number"
            width="130"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="subject_id"
            headerText="Subject Code"
            width="100"
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
            field="batch"
            headerText="Performance"
            width="90"
            format="C2"
            textAlign="Left"
            template={(rowData) => (
              <div className="flex gap-3">
                <button
                  className="btn-primary"
                  onClick={(e) => {
                    // e.preventDefault();
                    handlePerformanceClick(
                      e,
                      rowData.student_id,
                      rowData.name,
                      rowData.email
                    );
                  }}
                >
                  View
                </button>
              </div>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
      </GridComponent>

      {showPerformanceModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div
            className="bg-white rounded-md p-10 lg:w-1/2 md:w-full"
            ref={modalRef}
          >
            <StudentPerformance
              studentPerformance={studentPerformance}
              studentDetails={studentDetails}
              slope={slope}
            />
          </div>
        </div>
      )}

      {isActionInProgress && (
        <Processing text="Processing the Students Grade" />
      )}
    </>
  );
}

export default StudentList;
