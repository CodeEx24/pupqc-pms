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
import React, { useEffect, useState } from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';

function SubjectList({ subjects }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(key + 1);
  }, [subjects.data]);

  console.log('RENDER: ', key);

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
      <Inject services={[Sort, Page, Search, Toolbar]} />
    </GridComponent>
  );
}

export default SubjectList;
