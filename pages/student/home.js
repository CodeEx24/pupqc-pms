import StudentLayout from '@/components/StudentLayout';
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
import { data } from '@/utils/datasource';

function HomeScreen() {
  const pageSettings = { pageSize: 6 };

  return (
    <StudentLayout title="Home">
      <div>
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Title Here</h1>

        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={pageSettings}
        >
          <ColumnsDirective>
            <ColumnDirective field="OrderID" width="100" textAlign="Right" />
            <ColumnDirective field="CustomerID" width="100" />
            <ColumnDirective field="EmployeeID" width="100" textAlign="Right" />
            <ColumnDirective
              field="Freight"
              width="100"
              format="C2"
              textAlign="Right"
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
