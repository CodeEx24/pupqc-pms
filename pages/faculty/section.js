// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Sort,
  Edit,
  Inject,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useSession } from 'next-auth/react';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2/data';
import { baseUrl } from '../../utils/data';

function SectionScreen() {
  const { data: session } = useSession();
  const user_id = session.user._id;

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  // const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  // function dataStateChange(state) {
  //   console.log('ARAGS', state);
  // }

  // const dataSourceChanged = (state) => {
  //   console.log('STATA', state);
  // };

  const subjectDataManager = new DataManager({
    adaptor: new UrlAdaptor(),
    url: baseUrl + `/api/subject/${user_id}`,
    // insertUrl: 'http://localhost:3000' + `/api/subject/insert/${user_id}`,
    // removeUrl: baseUrl + `/api/subject/delete/${user_id}`,
    // updateUrl: baseUrl + `/api/subject/update/${user_id}`,
  });

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Section</h1>
        <GridComponent
          dataSource={subjectDataManager}
          editSettings={editOptions}
          // toolbar={toolbarOptions}
          pageSettings={{ pageSize: 6 }}
          allowPaging={true}
          allowSorting={true}
          // dataSourceChanged={dataSourceChanged}
          // dataStateChange={dataStateChange}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="subject"
              headerText="Subject"
              width="150"
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
              width="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="section"
              headerText="Section"
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
          <Inject services={[Page, Edit, Sort, Toolbar]} />
        </GridComponent>
      </div>
    </FacultyLayout>
  );
}

SectionScreen.auth = {
  role: 'faculty',
};

export default SectionScreen;
