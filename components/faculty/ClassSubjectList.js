import React from 'react';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Edit,
  Toolbar,
  Search,
  Inject,
} from '@syncfusion/ej2-react-grids';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';

function ClassSubjectList({ subjects }) {
  const subjectDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjects.data,
  });

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  return (
    <GridComponent
      dataSource={subjectDataManager}
      pageSettings={pageOptions}
      allowPaging={true}
      allowSorting={true}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="subject"
          headerText="Subject"
          width="250"
          textAlign="Left"
          isPrimaryKey={true}
        />
        <ColumnDirective
          field="name"
          headerText="Class Name"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="year"
          headerText="Year"
          width="90"
          textAlign="Left"
        />
        <ColumnDirective
          field="section"
          headerText="Section"
          width="90"
          textAlign="Left"
        />
        <ColumnDirective
          field="batch"
          headerText="Batch"
          width="90"
          textAlign="Left"
        />
      </ColumnsDirective>
      <Inject services={[Sort, Page, Edit, Toolbar, Search]} />
    </GridComponent>
  );
}

export default ClassSubjectList;
