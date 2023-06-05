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

// import { useForm } from 'react-hook-form';
// import { deleteClassSubject } from '../../hooks/Admin/deleteData';
// import { toast } from 'react-toastify';

function SubjectList({ subjectList }) {
  console.log('CLASS LIST: ', subjectList);

  const subjectListDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectList,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  return (
    <>
      <GridComponent
        dataSource={subjectListDataManager}
        pageSettings={pageOptions}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="_id"
            headerText="Subject Code"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="name"
            headerText="Subject Name"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="description"
            headerText="Subject Description"
            width="100"
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

export default SubjectList;
