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
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';

function ClassSubjectList({ subjectClass }) {
  console.log(subjectClass);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(key + 1);
  }, [subjectClass]);

  const subjectClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectClass,
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
        <ColumnDirective field="classSubject_id" width="0" textAlign="Left" />
        <ColumnDirective
          field=""
          headerText="Manage Criteria Overall"
          width="150"
          template={(rowData) => (
            <Link
              href={`/faculty/class-subject/${rowData.classSubject_id}`}
              className="btn-primary-no-width px-3"
            >
              Manage
            </Link>
          )}
        />
      </ColumnsDirective>
      <Inject services={[Sort, Page, Search, Toolbar]} />
    </GridComponent>
  );
}

export default ClassSubjectList;
