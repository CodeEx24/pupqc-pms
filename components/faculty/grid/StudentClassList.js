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

// import { toast } from 'react-toastify';

import { useMemo } from 'react';

import Link from 'next/link';

function StudentClassList({ studentClass }) {
  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...(studentClass.data.classList || [])],
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

  const semesterOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'semester';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', '1st Semester', '2nd Semester', 'Summer Term'],
        placeholder: 'Select a value',
        popupHeight: '200px',
        change: (e) => {
          const gridObj =
            document.getElementsByClassName('e-grid')[0].ej2_instances[0];
          e.value === 'All'
            ? gridObj.removeFilteredColsByField('semester')
            : gridObj.filterByColumn('semester', 'equal', e.value);
        },
      });
      DropDownListObj.appendTo('#semester');
    },
  };

  const pageOptions = useMemo(() => {
    return {
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      currentPage: 1,
    };
  }, []);

  const studentsClassDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: studentClass.data.data,
  });

  let grid;

  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  return (
    <div>
      <GridComponent
        id="grid"
        dataSource={studentsClassDataManager}
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
            field="subject_id"
            headerText="Subject Code"
            width="100"
            textAlign="Left"
          />
          <ColumnDirective
            field="student_name"
            headerText="Name"
            width="130"
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
            field="semester"
            headerText="Semester"
            width="90"
            filterBarTemplate={semesterOptions}
            textAlign="Left"
          />

          <ColumnDirective
            field="batch"
            headerText="Batch"
            width="90"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="student_id"
            headerText="Performance Management"
            width="150"
            template={(rowData) => (
              <Link
                href={`/faculty/performance/student/${rowData.student_id}/${rowData.class_subject_id}`}
                target="_blank"
                disabled={rowData.isGradeFinalized}
              >
                <button
                  className={`btn-primary px-3 ${
                    rowData.isGradeFinalized && 'opacity-60'
                  }`}
                >
                  Manage Grades
                </button>
              </Link>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default StudentClassList;
