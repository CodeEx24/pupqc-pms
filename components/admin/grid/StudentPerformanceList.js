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
// import { DropDownList } from '@syncfusion/ej2/dropdowns';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import Processing from '../../Processing';
import { useRef } from 'react';
import { useEffect } from 'react';
import StudentPerformance from '../charts/StudentPerformance';
import { toast } from 'react-toastify';

function StudentPerformanceList({ students }) {
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [studentPerformance, setStudentPerformance] = useState({});
  const [careerRecommendation, setCareerRecommendation] = useState('');
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

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const studentsDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: students.data.studentData,
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

      const res = await axios.get('/api/admin/student/graduated/performance', {
        params: {
          studentId,
        },
      });
      setStudentPerformance(res.data.studentPerformance);
      setCareerRecommendation(res.data.careerRecommendation);

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
                      rowData._id,
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
              careerRecommendation={careerRecommendation}
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

export default StudentPerformanceList;
