import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
} from '@syncfusion/ej2-react-grids';
import React from 'react';

import { DataManager, WebApiAdaptor } from '@syncfusion/ej2/data';

function SubjectList() {
  const subjectDataManager = new DataManager({
    adaptor: new WebApiAdaptor(),
    url: '/api/subject',
  });
  const pageOptions = {
    pageSize: 5,
  };

  return (
    <GridComponent
      dataSource={subjectDataManager}
      pageSettings={pageOptions}
      allowPaging={true}
      toolbar={['Search']}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="_id"
          headerText="Subject Code"
          width="100"
          textAlign="Left"
          isPrimaryKey={true}
        />
        <ColumnDirective
          field="name"
          headerText="Name"
          width="150"
          textAlign="Left"
        />
        <ColumnDirective
          field="description"
          headerText="Description"
          width="150"
          textAlign="Left"
        />
      </ColumnsDirective>
      <Inject services={[Page]} />
    </GridComponent>
  );
}

export default SubjectList;
