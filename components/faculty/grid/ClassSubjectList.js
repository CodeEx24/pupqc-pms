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
import Link from 'next/link';
import { useMemo } from 'react';
import { useRef } from 'react';

function ClassSubjectList({ subjectClass }) {
  const gridRef = useRef(null);

  const subjectClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: subjectClass,
  });

  const pageOptions = useMemo(() => {
    return {
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      currentPage: 1,
    };
  }, []);

  return (
    <GridComponent
      ref={gridRef}
      dataSource={subjectClassDataManager}
      pageSettings={pageOptions}
      allowPaging={true}
      allowSorting={true}
      persistSelection={true} // Set persistSelection property to true
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
          template={(rowData) => {
            return rowData.isGradeFinalized ? (
              <button className="btn-primary px-3 opacity-60" disabled>
                Manage
              </button>
            ) : (
              <Link href={`/faculty/class-subject/${rowData.classSubject_id}`}>
                <button className="btn-primary px-3">Manage</button>
              </Link>
            );
          }}
        />
      </ColumnsDirective>
      <Inject services={[Sort, Page, Search, Toolbar]} />
    </GridComponent>
  );
}

export default ClassSubjectList;
