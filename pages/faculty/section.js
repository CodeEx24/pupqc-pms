import FacultyLayout from '@/components/FacultyLayout';
import { data } from '@/utils/datasource';
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

function SectionScreen() {
  const pageSettings = { pageSize: 6 };

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Section</h1>
        <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={pageSettings}
        >
          <ColumnsDirective>
            <ColumnDirective field="OrderId" width="100" textAlign="Left" />
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

        {/* GRIDS FOR SECTION WHEN WE ALREADY GET THE DATA IN THE DATABASE */}
        {/* <GridComponent
          dataSource={data}
          allowPaging={true}
          pageSettings={pageSettings}
        >
          <ColumnsDirective>
            <ColumnDirective field="Name" width="100" textAlign="Left" />
            <ColumnDirective field="Description" width="100" />
            <ColumnDirective field="Subject" width="100" textAlign="Left" />
            <ColumnDirective field="Year" width="100" textAlign="Left" />
            <ColumnDirective field="Section" width="100" textAlign="Left" />
            <ColumnDirective field="Batch" width="100" textAlign="Left" />
            <ColumnDirective
              field="Freight"
              width="100"
              format="C2"
              textAlign="Left"
            />
            <ColumnDirective field="ShipCountry" width="100" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent> */}
      </div>
    </FacultyLayout>
  );
}

SectionScreen.auth = {
  role: 'faculty',
};

export default SectionScreen;
