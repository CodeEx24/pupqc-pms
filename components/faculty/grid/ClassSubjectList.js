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

function ClassSubjectList({ subjectClass }) {
  const subjectClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectClass.data,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  return (
    <GridComponent
      dataSource={subjectClassDataManager}
      pageSettings={pageOptions}
      allowPaging={true}
      allowSorting={true}
      toolbar={['Search']}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="subject_id"
          headerText="Subject Code"
          width="100"
          textAlign="Left"
          isPrimaryKey={true}
        />
        <ColumnDirective
          field="class_name"
          headerText="Class Name"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="criteria"
          headerText="Criteria"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="semester"
          headerText="Semester"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="batch"
          headerText="Batch"
          width="100"
          textAlign="Left"
        />
      </ColumnsDirective>
      <Inject services={[Sort, Page, Search, Toolbar]} />
    </GridComponent>
  );
}

export default ClassSubjectList;
