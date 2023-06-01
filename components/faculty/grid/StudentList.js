import React from 'react';

import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2/data';
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2/dropdowns';
import Image from 'next/image';

function StudentList({ students }) {
  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...(students.data.classList || [])],
        placeholder: 'Select a value',
        popupHeight: '200px',
        change: (e) => {
          const gridObj =
            document.getElementsByClassName('e-grid')[0].ej2_instances[0];
          e.value === 'All'
            ? gridObj.removeFilteredColsByField('class_name')
            : gridObj.filterByColumn('class_name', 'equal', e.value);
        },
      });
      DropDownListObj.appendTo('#class_name');
    },
  };

  const pageOptions = {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  };

  const studentsDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: students.data.data,
  });

  let grid;

  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };
  return (
    <GridComponent
      id="grid"
      dataSource={studentsDataManager}
      toolbar={toolbar}
      allowPdfExport={true}
      allowPaging={true}
      toolbarClick={toolbarClick}
      ref={(g) => (grid = g)}
      allowSorting={true}
      allowFiltering={true}
      pageSettings={pageOptions}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="profileImageUrl"
          headerText="Profile Image"
          width="80"
          headerTextAlign="Center"
          allowFiltering={false}
          template={(rowData) => (
            <Image
              src={rowData.profileImageUrl}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full mx-auto"
              style={{ width: 'auto', height: 'auto' }}
            />
          )}
        />

        <ColumnDirective
          field="student_id"
          headerText="Name"
          width="130"
          textAlign="Left"
        />
        <ColumnDirective
          field="email"
          headerText="Email"
          width="200"
          format="C2"
          textAlign="Left"
        />
        <ColumnDirective
          field="mobileNo"
          headerText="Mobile Number"
          width="130"
          format="C2"
          textAlign="Left"
        />
        <ColumnDirective
          field="subject_id"
          headerText="Subject Code"
          width="100"
          textAlign="Left"
        />
        <ColumnDirective
          field="class_name"
          headerText="Class"
          width="100"
          filterBarTemplate={templateOptions}
          textAlign="Left"
        />
        <ColumnDirective
          field="batch"
          headerText="Batch"
          width="90"
          format="C2"
          textAlign="Left"
        />
      </ColumnsDirective>
      <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
    </GridComponent>
  );
}

export default StudentList;
