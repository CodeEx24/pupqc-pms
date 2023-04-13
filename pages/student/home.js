import StudentLayout from '@/components/student/StudentLayout';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
} from '@syncfusion/ej2-react-grids';
import data from '@/utils/datasource';

function HomeScreen() {
  const pageSettings = { pageSize: 6 };

  return (
    <StudentLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Title Here</h1>
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={pageSettings}
        >
          <ColumnsDirective>
            <ColumnDirective field="OrderID" width="100" textAlign="Left" />
            <ColumnDirective field="CustomerID" width="100" />
            <ColumnDirective field="EmployeeID" width="100" textAlign="Left" />
            <ColumnDirective
              field="Freight"
              width="100"
              format="C2"
              textAlign="Left"
            />
            <ColumnDirective field="ShipCountry" width="100" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
      </div>
    </StudentLayout>
  );
}

HomeScreen.auth = {
  role: 'student',
};

export default HomeScreen;
