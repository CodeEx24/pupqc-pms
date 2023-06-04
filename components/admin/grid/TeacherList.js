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
// import { useEffect } from 'react';
// import { useState } from 'react';

import Image from 'next/image';

function TeacherList({ teacherList }) {
  const teacherListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: teacherList,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  return (
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
                  rowData.isActive === true ? 'text-primary' : 'text-secondary'
                }`}
              >
                {rowData.isActive === true ? 'Active' : 'Not Active'}
              </p>
            );
          }}
        />
        <ColumnDirective field="classSubject_id" width="0" textAlign="Left" />
      </ColumnsDirective>
      <Inject services={[Sort, Page, Search, Toolbar]} />
    </GridComponent>
  );
}

export default TeacherList;
