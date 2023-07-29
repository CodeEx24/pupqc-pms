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
import { useMemo } from 'react';

// import { useEffect } from 'react';
// import { useState } from 'react';

// import { useForm } from 'react-hook-form';
// import { deleteClassSubject } from '../../hooks/Admin/deleteData';
// import { toast } from 'react-toastify';

function FacultyAchievementList({ facultyAchievementList }) {
  const facultyAchievementListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: facultyAchievementList,
  });

  const pageOptions = useMemo(() => {
    return {
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      currentPage: 1,
    };
  }, []);

  return (
    <>
      <GridComponent
        dataSource={facultyAchievementListDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="70"
            textAlign="Left"
          />
          <ColumnDirective
            field="achievementType"
            headerText="Achievement Type"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="title"
            headerText="Title"
            width="50"
            textAlign="Left"
          />
          <ColumnDirective
            field="year"
            headerText="Year"
            width="50"
            textAlign="Left"
          />
          {/* <ColumnDirective
                field="_id"
                headerText="Subject Code"
                width="100"
                textAlign="Left"
              /> */}
        </ColumnsDirective>
        <Inject services={[Sort, Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
}

export default FacultyAchievementList;
