import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '../../components/hooks/FacultySubject/fetch';

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

function StudentsListScreen() {
  const { data: students, isLoading } = useQuery(['students'], fetchStudents);

  if (isLoading) {
    return (
      <FacultyLayout title="Home">
        <div className="bg-white p-10 rounded-xl">
          <h1 className="text-sky-400 font-bold text-3xl mb-5">
            Students Lists
          </h1>
        </div>
      </FacultyLayout>
    );
  }

  const templateOptions = {
    create: () => {
      const dd = document.createElement('input');
      dd.id = 'class_name';
      return dd;
    },
    write: () => {
      const DropDownListObj = new DropDownList({
        dataSource: ['All', ...students.data.classList],
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
    pageSize: 50,
    pageSizes: true,
  };

  const studentsDataManager = new DataManager({
    adaptor: new RemoteSaveAdaptor(),
    json: students?.data.data,
  });

  let grid;

  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Lists</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <GridComponent
              id="grid"
              dataSource={studentsDataManager}
              height={270}
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
                  field="student_id"
                  headerText="Name"
                  width="130"
                  textAlign="Left"
                />

                <ColumnDirective
                  field="email"
                  headerText="Email"
                  width="130"
                  format="C2"
                  textAlign="Left"
                />
                <ColumnDirective
                  field="mobileNo"
                  headerText="Mobile Number"
                  width="100"
                  format="C2"
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
                  width="70"
                  format="C2"
                  textAlign="Left"
                />
              </ColumnsDirective>
              <Inject services={[Sort, Filter, Page, PdfExport, Toolbar]} />
            </GridComponent>
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

StudentsListScreen.auth = {
  role: 'faculty',
};

export default StudentsListScreen;
