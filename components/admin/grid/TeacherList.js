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
import React, { useEffect, useRef, useState } from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
// import { useEffect } from 'react';
// import { useState } from 'react';

import Image from 'next/image';
import axios from 'axios';
import TeacherPerformance from '../charts/TeacherPerformance';
import Processing from '../../Processing';

function TeacherList({ teacherList }) {
  console.log('teacherList: ', teacherList);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [teacherPerformance, setTeacherPerformance] = useState({});
  const [slope, setSlope] = useState(0);
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  const [teacherDetails, setteacherDetails] = useState({
    name: '',
    email: '',
    status: '',
  });

  const teacherListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: teacherList,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

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

  const handleClickViewPerformance = async (
    teacher_id,
    name,
    email,
    status
  ) => {
    try {
      setIsActionInProgress(true);
      const res = await axios.get(`/api/admin/teacher/performance`, {
        params: { teacher_id },
      });
      setTeacherPerformance(res.data.techerPerformance);
      console.log('res.data.slope: ', res.data.slope);
      setSlope(
        res.data.slope > 0
          ? 'Going higher'
          : res.data.slope < 0
          ? 'Going lower'
          : 'Flat'
      );

      setteacherDetails({
        name,
        email,
        status: status ? 'Active' : 'Not Active',
      });

      setShowPerformanceModal(true);
      console.log('DONE SHOWING');
    } catch (error) {
      console.log(error);
    } finally {
      setIsActionInProgress(false);
    }
  };

  return (
    <>
      <GridComponent
        dataSource={teacherListDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="profileImageUrl"
            headerText="Profile Image"
            width="100"
            headerTextAlign="Center"
            allowFiltering={false}
            template={(rowData) => (
              <Image
                src={rowData.profileImageUrl}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full  mx-auto"
                style={{ width: '40', height: '40' }}
              />
            )}
          />
          <ColumnDirective
            field="name"
            headerText="Name"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="gender"
            headerText="Gender"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="mobileNo"
            headerText="Mobile Number"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="isActive"
            headerText="Status"
            width="100"
            textAlign="Left"
            template={(rowData) => {
              return (
                <p
                  className={`font-semibold font-poppins ${
                    rowData.isActive === true
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                >
                  {rowData.isActive === true ? 'Active' : 'Not Active'}
                </p>
              );
            }}
          />

          <ColumnDirective
            field="isActive"
            headerText="Performance"
            width="100"
            textAlign="Left"
            template={(rowData) => {
              return (
                <button
                  className="btn-primary"
                  onClick={() =>
                    handleClickViewPerformance(
                      rowData._id,
                      rowData.name,
                      rowData.email,
                      rowData.isActive
                    )
                  }
                >
                  View
                </button>
              );
            }}
          />
          <ColumnDirective field="classSubject_id" width="0" textAlign="Left" />
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
      {showPerformanceModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div
            className="bg-white rounded-md p-10 lg:w-1/2 md:w-full"
            ref={modalRef}
          >
            <TeacherPerformance
              teacherPerformance={teacherPerformance}
              teacherDetails={teacherDetails}
              slope={slope}
            />
          </div>
        </div>
      )}

      {isActionInProgress && (
        <Processing text="Processing the Teachers Grade" />
      )}
    </>
  );
}

export default TeacherList;
